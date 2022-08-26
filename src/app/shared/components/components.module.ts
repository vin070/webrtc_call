import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MicOnComponent } from "./svg/mic-on/mic-on.component";
import { MicOffComponent } from "./svg/mic-off/mic-off.component";
import { VideoOnComponent } from "./svg/video-on/video-on.component";
import { VideoOffComponent } from "./svg/video-off/video-off.component";
import { TerminateComponent } from "./svg/terminate/terminate.component";
import { CopyComponent } from "./svg/copy/copy.component";
import { CheckComponent } from "./svg/check/check.component";

const components = [
  CopyComponent,
  CheckComponent,
  MicOnComponent,
  MicOffComponent,
  VideoOnComponent,
  VideoOffComponent,
  TerminateComponent,
];

@NgModule({
  declarations: components,
  imports: [CommonModule],
  exports: components,
})
export class ComponentsModule {}
