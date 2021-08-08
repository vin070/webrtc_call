import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule}from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormValidationComponent } from './form-validation/form-validation.component';
import {SharedModule} from './shared/shared.module';
import { CrossValidationComponent } from './cross-validation/cross-validation.component';
import { WebrtcCallingComponent } from './webrtc-calling/webrtc-calling.component';
@NgModule({
  declarations: [
    AppComponent,
    FormValidationComponent,
    CrossValidationComponent,
    WebrtcCallingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
