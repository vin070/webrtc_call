import { Component, Input } from "@angular/core";

@Component({
  selector: "copy",
  templateUrl: "./copy.component.html"
})
export class CopyComponent {
  @Input() height: string = "24";
  @Input() width: string = "24";
  @Input() fill: string = "#ffffff";

  constructor() {}
}
