import { Component, Input } from "@angular/core";

@Component({
  selector: "mic-off",
  templateUrl: "./mic-off.component.html",
})
export class MicOffComponent{
  @Input() height: string = "24";
  @Input() width: string = "24";
  @Input() fill: string = "#ffffff";

  constructor() {}
}
