import { Component, Input } from "@angular/core";

@Component({
  selector: "video-off",
  templateUrl: "./video-off.component.html"
})
export class VideoOffComponent {

  @Input() height: string = "24";
  @Input() width: string = "24";
  @Input() fill: string = "#ffffff";
  
  constructor() {}
}
