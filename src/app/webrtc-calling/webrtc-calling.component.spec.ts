import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebrtcCallingComponent } from './webrtc-calling.component';

describe('WebrtcCallingComponent', () => {
  let component: WebrtcCallingComponent;
  let fixture: ComponentFixture<WebrtcCallingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebrtcCallingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebrtcCallingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
