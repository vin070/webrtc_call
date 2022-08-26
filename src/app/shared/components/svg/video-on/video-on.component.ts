import { Component, Input } from "@angular/core";

@Component({
  selector: "video-on",
  templateUrl: "./video-on.component.html",
})
export class VideoOnComponent {
  @Input() height: string = "24";
  @Input() width: string = "24";
  @Input() fill: string = "#ffffff";

  constructor() {}
}
