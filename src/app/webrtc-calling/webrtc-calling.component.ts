import { v4 as uuid_v4 } from "uuid";
import { Utils} from "../shared/utils";
import { OnInit, Component } from "@angular/core";
import { Params, ActivatedRoute } from "@angular/router";
import { environment } from "../../environments/environment";
import { WebsocketService } from "../shared/service/websocket/websocket.service";

@Component({
  selector: "webrtc-calling",
  templateUrl: "./webrtc-calling.component.html"
})
export class WebrtcCallingComponent implements OnInit {
  peerconnection: RTCPeerConnection | any;
  local_stream: any;
  room_name: string = "NULL";
  audio_on: boolean = true;
  video_on: boolean = true;
  RTP_sender: any = {};
  invite_copied: boolean = false;

  constructor(
    private _utils: Utils,
    private _socket: WebsocketService,
    private _activated_route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this._activated_route.paramMap.subscribe((param: Params) => {
      this.room_name = param.get("room_name") || uuid_v4();
      this.get_user_media(true, true)
        .then((stream: MediaStream) => {
          this.local_stream = stream;
          let element: HTMLVideoElement = <HTMLVideoElement>(
            document.getElementById("local_video")
          );
          element.srcObject = new MediaStream(stream.getVideoTracks());
          this.audio_on = true;
          this.video_on = true;
        })
        .then(() => {
          this.socketEventListener();
          this.join();
        })
        .catch((err) => {
          this.audio_on = false;
          this.video_on = false;
          console.error(err);
        });
    });
  }

  join(): void {
    let email: string | null = window.prompt("Enter your email");
    this._socket.emit("join", { room_name: this.room_name, email });
  }

  create_peer_connection(): void {
    this.peerconnection = new RTCPeerConnection({
      iceServers: [
        {
          urls: environment.turnServer,
          username: environment.turnUserName,
          credential: environment.turnPassword,
        },
        {
          urls: environment.stunServer,
        },
      ],
    });
    this.peer_connection_event_listener();
  }

  add_track_to_peerconnection() {
    this.local_stream.getTracks().forEach((track: MediaStreamTrack) => {
      const sender: RTCRtpSender = this.peerconnection.addTrack(
        track,
        this.local_stream
      );
      this.RTP_sender[track.kind] = sender;
    });
  }

  turn_server_connection(data?: RTCSessionDescription | any): void {
    if (data && data.type == "offer") {
      this.create_peer_connection();
      this.add_track_to_peerconnection();
      this.peerconnection.setRemoteDescription(data);
      this.peerconnection
        .createAnswer()
        .then((answer: RTCSessionDescription) => {
          this.peerconnection.setLocalDescription(answer);
          this._socket.emit("message", {
            room_name: this.room_name,
            data: answer,
          });
        })
        .catch((err: any) => console.error("error in creating answer", err));
    } else if (data && data.type == "answer") {
      this.peerconnection.setRemoteDescription(data);
    } else if (data && data.type == "candidate") {
      this.peerconnection.addIceCandidate(data.candidate);
    } else if (!data) {
      this.create_peer_connection();
      this.add_track_to_peerconnection();
    }
  }

  create_offer_SDP() {
    this.peerconnection
      .createOffer({
        iceRestart: true,
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
        voiceActivityDetection: true,
      })
      .then((offer: any) => {
        this.peerconnection.setLocalDescription(offer);
        this._socket.emit("message", {
          room_name: this.room_name,
          data: offer,
        });
      })
      .catch((err: any) =>
        console.error("error occured in creating local sdp", err)
      );
  }

  get_user_media(audio: boolean, video: boolean): Promise<MediaStream> {
    return new Promise((resolve, reject) => {
      return window.navigator.mediaDevices
        .getUserMedia({ audio, video })
        .then((stream: MediaStream) => resolve(stream))
        .catch((err) => reject(err));
    });
  }

  peer_connection_event_listener(): void {
    this.peerconnection.onicecandidate = (data: RTCPeerConnectionIceEvent) => {
      if (data.candidate)
        this._socket.emit("message", {
          room_name: this.room_name,
          data: { type: "candidate", candidate: data.candidate },
        });
    };

    this.peerconnection.onnegotiationneeded = (data: any) => {
      this.create_offer_SDP();
    };

    this.peerconnection.ontrack = ({track, streams}) => {
      let remote_video: HTMLVideoElement = <HTMLVideoElement>(
        document.getElementById("remote_video")
      );
      let remote_audio: HTMLAudioElement = <HTMLAudioElement>(
        document.getElementById("remote_audio")
      );

      track.onunmute = (unmute: any) => {
        if (track.kind == "video")
          remote_video.srcObject = new MediaStream(
            streams[0].getVideoTracks()
          );
        else if (track.kind == "audio")
          remote_audio.srcObject = new MediaStream(
            streams[0].getAudioTracks()
          );
      };
      track.onmute = (mute: any) => {
        if (track.kind == "video") remote_video.srcObject = null;
        if (track.kind == "audio") remote_audio.srcObject = null;
      };
    };
  }

  socketEventListener() {
    this._socket.listen("message").subscribe((data: any) => {
      this.turn_server_connection(data);
    });

    this._socket.listen("room_join").subscribe((data: any) => {
      this.turn_server_connection();
    });
  }

  leave_meeting(): void {
    let remote_video: HTMLVideoElement = <HTMLVideoElement>(
      document.getElementById("remote_video")
    );
    let remote_audio: HTMLAudioElement = <HTMLAudioElement>(
      document.getElementById("remote_audio")
    );
    let local_video: HTMLVideoElement = <HTMLVideoElement>(
      document.getElementById("local_video")
    );
    let remote_track: any = remote_video.srcObject;
    let remote_audio_track: any = remote_audio.srcObject;
    let local_track: any = local_video.srcObject;
 
    local_track?.getTracks().forEach((track: any) => track.stop());
    remote_track?.getTracks().forEach((track: any) => track.stop());
    remote_audio_track?.getTracks().forEach((track: any) => track.stop());
    this.local_stream?.getTracks().forEach((track: any) => track.stop());
    local_video.srcObject = null;
    remote_video.srcObject = null;
    remote_audio.srcObject = null;

    this._socket.emit("left", { room_name: this.room_name });
  }

  handle_video_toggle(): void {
    let local_video_ele: HTMLVideoElement = <HTMLVideoElement>(
      document.getElementById("local_video")
    );

    if (this.video_on) {
      this.local_stream.getTracks().forEach((track: MediaStreamTrack) => {
        if (track.kind == "video") {
          track.stop();
          this.video_on = false;
          local_video_ele.srcObject = null;
          this.RTP_sender.video.replaceTrack(null);
        }
      });
    } else {
      this.get_user_media(this.audio_on, true).then((stream: MediaStream) => {
        this.local_stream = stream;
        local_video_ele.srcObject = new MediaStream(stream.getVideoTracks());
        this.RTP_sender.video.replaceTrack(stream.getVideoTracks()[0]);
        this.video_on = true;
      });
    }
  }

  handle_mic_toggle(): void {
    if (this.audio_on) {
      this.local_stream.getTracks().forEach((track: MediaStreamTrack) => {
        if (track.kind == "audio") {
          track.stop();
          this.audio_on = false;
          this.RTP_sender.audio.replaceTrack(null);
        }
      });
    } else {
      this.get_user_media(true, this.video_on).then((stream: MediaStream) => {
        this.local_stream = stream;
        this.RTP_sender.audio.replaceTrack(stream.getAudioTracks()[0]);
        this.audio_on = true;
      });
    }
  }

  copy_invite() {
    this._utils.get_url();
    this._utils.copy_text(`${this._utils.get_url()}webrtc/${this.room_name}`)
      .then((data: any) => {
        this.invite_copied = true;
        setTimeout(() => {
          this.invite_copied = false;
        }, 2000);
      })
      .catch((err) => console.error(err));
  }
}
