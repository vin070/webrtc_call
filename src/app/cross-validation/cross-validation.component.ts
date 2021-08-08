import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms';
import {identityReveledValidator} from '../shared/directive/identity-reveled.directive';
@Component({
  selector: 'app-cross-validation',
  templateUrl: './cross-validation.component.html',
  styleUrls: ['./cross-validation.component.scss']
})
export class CrossValidationComponent implements OnInit {


  //crossFor validation with form builder
  heroForm:FormGroup= this.form_builder.group({
    name:[''],
    alterEgo:[''],
  },{validator:identityReveledValidator});
   
  //cross form validation example without formbuilder
  // const heroForm = new FormGroup({
  //   'name': new FormControl(),
  //   'alterEgo': new FormControl(),
  //   'power': new FormControl()
  // }, { validators: identityRevealedValidator });
  constructor(
    private readonly form_builder:FormBuilder
  ) { }

  ngOnInit(): void {
    
    this.heroForm.valueChanges.subscribe((data:FormGroup)=>{
      console.log("this.heroForm",this.heroForm,data)
    });
    
    let arr=[1,2,3,4];
    let obj={
      a:1,
      b:2,
      c:()=>alert(true)
    };

    console.log('arr',arr?.[3])
    console.log("obj without function",obj?.["a"])
    console.log("obj with function",obj["c"]?.())
    
  }

}
