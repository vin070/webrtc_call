import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WebrtcCallingComponent } from "./webrtc-calling/webrtc-calling.component";

//Route to component mapping
const routes: Routes = [
  {
    path: "webrtc/:room_name",
    component: WebrtcCallingComponent,
  },
  {
    path: "webrtc",
    component: WebrtcCallingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
