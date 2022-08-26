import { Component, Input } from "@angular/core";

@Component({
  selector: "mic-on",
  templateUrl: "./mic-on.component.html",
})
export class MicOnComponent {
  @Input() height: string = "24";
  @Input() width: string = "24";
  @Input() fill: string = "#ffffff";

  constructor() {}
}
