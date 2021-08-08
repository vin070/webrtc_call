 import { 
  OnInit,
  Component
 } from '@angular/core';
 import { 
   Params, 
   ActivatedRoute
 } from "@angular/router";
 import { environment } from "../../environments/environment";
 import { WebsocketService } from "../shared/service/websocket.service";

 @Component({
  selector: 'app-webrtc-calling',
  templateUrl: './webrtc-calling.component.html',
  styleUrls: ['./webrtc-calling.component.scss']
 })

 export class WebrtcCallingComponent implements OnInit {

 peerconnection:any;
 local_stream:any;
 room_name:string="NULL";
 audioOn:boolean=true;
 videoOn:boolean=true;

 constructor(
   private active_route : ActivatedRoute,
   private socket : WebsocketService
 ) { 
     this.socketEventListener()
     this.getUserMedia(true,true)
    .then((steam:MediaStream) => {
        this.local_stream = steam;
        this.join(this.room_name);
    })
 }

 ngOnInit(): void{
     
     this.active_route.paramMap.subscribe((data:Params) => {
         this.room_name = data.get("room_name")
        
     });
 }
  
 join(room_name:string):void{
     this.socket.emit("join",{email:"someone@gmail.com",room_name:room_name})
 }

 createPeerConnection() : void {
     this.peerconnection = new RTCPeerConnection({
         iceServers:[
             {
               urls : environment.turnServer,
               username : environment.turnUserName,
               credential : environment.turnPassword
             },
             {
               urls : environment.stunServer
            }
         ]
     });
     this.peerConnectionEventListener()
 }
 
 addTrackToPeerconnection(){
    this.local_stream.getTracks().forEach((track:MediaStreamTrack)=>{
        this.peerconnection.addTrack(track,this.local_stream)
    });
 }

 turnServerConnection(data?:RTCSessionDescription | any):void{
     
     if(data && data.type == "offer"){
         
         this.createPeerConnection();
         this.addTrackToPeerconnection();
         this.peerconnection.setRemoteDescription(data)
         this.peerconnection.createAnswer()
         .then((answer:any) => {
             this.peerconnection.setLocalDescription(answer);
             this.socket.emit("message", { room_name : this.room_name, data:answer });
         })
         .catch(( err:any ) => console.error("error in creating answer",err));
     }
     else if ( data && data.type == "answer"){
       this.peerconnection.setRemoteDescription(data)
       
     }
     else if ( data && data.type == "candidate"){
      this.peerconnection.addIceCandidate(data.candidate)
     }
     else if( !data){

        this.createPeerConnection();
        this.addTrackToPeerconnection();
    }
  
      
   }
 
   createOfferSdp(){
    this.peerconnection.createOffer({
      iceRestart:true,
      offerToReceiveAudio:true,
      offerToReceiveVideo:true,
      voiceActivityDetection:true
 })
.then((offer:any)=>{
     this.peerconnection.setLocalDescription(offer)
     this.socket.emit("message",{room_name:this.room_name,data:offer})
 })
 .catch((err:any) => console.error("error occured in creating local sdp",err));
  }

  getUserMedia(audio:boolean,video:boolean):Promise<MediaStream>{
      
      return new Promise((resolve,reject)=>{
         window.navigator.mediaDevices.getUserMedia({audio:audio,video:video})
         .then((stream:MediaStream)=>{
            let element:HTMLVideoElement = <HTMLVideoElement>document.getElementById("local")
            element.srcObject=stream
            resolve(stream);
         });
      });

  }
 
  peerConnectionEventListener() : void {
    
    this.peerconnection.onicecandidate = (data:RTCPeerConnectionIceEvent)=>{
        if(data.candidate) this.socket.emit("message",{room_name:this.room_name,data:{type:"candidate",candidate:data.candidate}})
    }

    this.peerconnection.onnegotiationneeded = (data:any)=>{
        this.createOfferSdp();
    }

    this.peerconnection.ontrack = (data:any) => {
     
     let ele:HTMLVideoElement = <HTMLVideoElement> document.getElementById("remote");
     data.track.onunmute = () => ele.srcObject = data.streams[0]
     data.track.onmute   = () => ele.srcObject = data.streams[0]
     

    }

  }

  socketEventListener(){
    
    this.socket.listen("message").subscribe((data:any) => {
        this.turnServerConnection(data)
    });
    
    this.socket.listen("room_join").subscribe((data:any) => {
         this.turnServerConnection();
    });
  
  }

  leaveMeeting() : void{

    let remoteVideoEle:HTMLVideoElement = <HTMLVideoElement> document.getElementById("remote");
    let localVideoEle:HTMLVideoElement = <HTMLVideoElement> document.getElementById("local");
    let remoteTrack:any = remoteVideoEle.srcObject;
    let localTrack:any= localVideoEle.srcObject;
    
    localTrack.getTracks().forEach((track:any)=>{
      track.stop();
    });

    remoteTrack.getTracks().forEach((track:any)=>{
      track.stop();
    });

    localVideoEle.srcObject = null;
    remoteVideoEle.srcObject = null;

    this.socket.emit("left",{room_name:this.room_name});
  }
  
  handleCameraClick(cameraStatus : boolean) : void{
      
     if(cameraStatus){
        
        this.local_stream.getTracks().forEach((track:MediaStreamTrack) => {
            if(track.kind == "video") { 
              track.stop();
              this.videoOn = false;
            }
        });
     }
     else{
        window.navigator.mediaDevices.getUserMedia({audio:false,video:true})
       .then((stream:MediaStream) => {
           let localVideoEle:HTMLVideoElement = <HTMLVideoElement> document.getElementById("local");
           let localTrack:any= localVideoEle.srcObject;
           localTrack.addTrack(stream.getVideoTracks()[0],stream);
           this.videoOn = true;
       })
     }
  }

  handleMicrophoneClick(micStatus : boolean) : void{
      
    if(micStatus){
       
       this.local_stream.getTracks().forEach((track:MediaStreamTrack) => {
           if(track.kind == "audio"){
              track.stop();
              this.audioOn = false;
           }
       });
    }
    else{
       window.navigator.mediaDevices.getUserMedia({audio:true,video:false})
      .then((stream:MediaStream) => {
          let localVideoEle:HTMLVideoElement = <HTMLVideoElement> document.getElementById("local");
          let localTrack:any= localVideoEle.srcObject;
          localTrack.addTrack(stream.getAudioTracks()[0],stream);
          this.audioOn = true;
      })
    }
 }

}
