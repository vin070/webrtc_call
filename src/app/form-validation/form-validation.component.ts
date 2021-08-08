import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder, Validators, FormControl} from '@angular/forms';
import {forbiddenNameValidator} from '../shared/directive/forbidden-name.directive';
@Component({
  selector: 'app-form-validation',
  templateUrl: './form-validation.component.html',
  styleUrls: ['./form-validation.component.scss']
})
export class FormValidationComponent implements OnInit {

  personal_details:FormGroup= new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
     
    ]),
  });

  constructor(
    private form_builder:FormBuilder
  ) { }

  ngOnInit(): void {
    console.log("this.personal_details",this.personal_details)
    this.personal_details.valueChanges.subscribe((data:any)=>{
      console.log("data",this.personal_details);
    })
  }

  get name():FormControl {
    return this.personal_details.get("name") as FormControl;
  }

}
