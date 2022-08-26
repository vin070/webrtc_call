import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ServiceModule } from "./service/service.module";
import { ComponentsModule } from "./components/components.module";

@NgModule({
  declarations: [],
  imports: [CommonModule, ServiceModule, ComponentsModule],
  exports: [ServiceModule, ComponentsModule],
  providers: [],
})
export class SharedModule {}
