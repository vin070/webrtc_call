import { NgModule } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { CommonModule } from '@angular/common';
import { 
  TestService,
  TestService2
} from './test.service';


function hello(){
  if(false)
    return new TestService();
  else
    return new TestService2();
}
@NgModule({
  imports: [
    CommonModule
  ],
  providers:[
    { provide:TestService,useFactory:hello},
    { provide:WebsocketService }
  ]
})
export class ServiceModule { }
