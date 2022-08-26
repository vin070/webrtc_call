import { Component, Input } from "@angular/core";

@Component({
  selector: "terminate-call",
  templateUrl: "./terminate.component.html"
})
export class TerminateComponent {
  
  @Input() height: string = "24";
  @Input() width: string = "24";
  @Input() fill: string = "#ffffff";
  
  constructor() {}
}
