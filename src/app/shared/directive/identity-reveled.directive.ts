import { Directive } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


export const identityReveledValidator:ValidatorFn=(control:AbstractControl):ValidationErrors|null=>{
       console.log("identityReveledValidator",control)
       const name:AbstractControl |null  = control.get('name');
       const alterEgo:AbstractControl |null = control.get('alterEgo');
       return name && alterEgo && (name.value == alterEgo.value ) ?{identityReveled:true}:null;
};


@Directive({
  selector: '[appIdentityReveled]'
})
export class IdentityReveledDirective {

  constructor() { }

}
