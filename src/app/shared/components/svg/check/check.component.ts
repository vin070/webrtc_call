import { Input, Component } from "@angular/core";

@Component({
  selector: "check",
  templateUrl: "./check.component.html",
})
export class CheckComponent {
  @Input() height: string = "24";
  @Input() width: string = "24";
  @Input() fill: string = "#ffffff";

  constructor() {}
}
