import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { WebsocketService } from "./websocket/websocket.service";

@NgModule({
  imports: [CommonModule],
  providers: [{ provide: WebsocketService }],
})
export class ServiceModule {}
