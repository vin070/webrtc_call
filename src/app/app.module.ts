import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "./shared/shared.module";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { WebrtcCallingComponent } from "./webrtc-calling/webrtc-calling.component";

@NgModule({
  declarations: [AppComponent, WebrtcCallingComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
