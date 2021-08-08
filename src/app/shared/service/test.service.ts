import { Injectable } from '@angular/core';

export class TestService2{
  sayHello(){
    console.log('hello TestService2');
  }
}

@Injectable({
  providedIn: 'root',
})
export class TestService {

  sayHello(){
    console.log('hello TestService');
  }
}

