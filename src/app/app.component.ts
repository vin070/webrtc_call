import { Component,Inject,InjectionToken,OnInit } from '@angular/core';
import {TestService} from './shared/service/test.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'practice-design';
  constructor(
    private readonly testService:TestService,
    @Inject('EXISTING_API_URL') private api_url:string,
    @Inject('API_URL') private api_url1:string,
  ){}
  ngOnInit(){
    this.testService.sayHello()
    let x= new InjectionToken<string>('do_sex');
    console.log(x)
    console.log('this.api_url',this.api_url)
    console.log('this.api_url1',this.api_url)
    let x1:object= Object.freeze({
      name:'vinet kumar'
    });
    console.log(Object.isFrozen(x1))
    console.log(x1)
  }
}
