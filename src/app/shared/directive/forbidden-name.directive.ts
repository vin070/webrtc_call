import { Directive,Input,OnChanges, SimpleChanges} from '@angular/core';
import {ValidatorFn,AbstractControl,ValidationErrors,Validator, NG_VALIDATORS} from '@angular/forms';


/** A hero's name can't match the given regular expression */
export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? {forbiddenName1: {value: control.value}} : null;
  };
}

@Directive({
  selector: '[appForbiddenName]',
  providers: [{provide:NG_VALIDATORS, useExisting: ForbiddenNameDirective, multi: true}]
})
export class ForbiddenNameDirective implements Validator,OnChanges {
    @Input('appForbiddenName') forbiddenName = '';
    
    validate(control: AbstractControl): ValidationErrors | null {
     
      console.log('ForbiddenNameDirective',control)
      return this.forbiddenName ? forbiddenNameValidator(new RegExp(this.forbiddenName, 'i'))(control)
                                : null;
    }
   
    ngOnChanges(data:SimpleChanges){
      console.log("this.forbiddenName",this.forbiddenName)
    }
    
  }