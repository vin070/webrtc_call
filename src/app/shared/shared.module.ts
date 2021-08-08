import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UtilModule} from './util/util.module';
import {DirectiveModule} from  './directive/directive.module'
import {ServiceModule} from './service/service.module';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UtilModule,
    DirectiveModule,
    ServiceModule
  ],
  exports:[
    UtilModule,
    DirectiveModule,
    ServiceModule
  ],
  providers:[
    {provide:'API_URL',useValue:'https://brrainfuck.com'},
    {provide:'EXISTING_API_URL',useExisting:'API_URL'}
  ]
})
export class SharedModule { }
