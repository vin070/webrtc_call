import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormValidationComponent} from './form-validation/form-validation.component';
import {CrossValidationComponent} from './cross-validation/cross-validation.component';
import {WebrtcCallingComponent} from './webrtc-calling/webrtc-calling.component';
const routes: Routes = [
  {
    path:':room_name',
    component:WebrtcCallingComponent
  },
  {
    path:'validation',
    component:FormValidationComponent
  },
  {
    path:'cross-validation',
    component:CrossValidationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
