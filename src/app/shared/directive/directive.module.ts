import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForbiddenNameDirective } from './forbidden-name.directive';
import { IdentityReveledDirective } from './identity-reveled.directive';

@NgModule({
  declarations: [ForbiddenNameDirective, IdentityReveledDirective],
  imports: [
    CommonModule
  ]
})
export class DirectiveModule { }
