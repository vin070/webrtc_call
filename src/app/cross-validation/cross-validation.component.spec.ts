import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossValidationComponent } from './cross-validation.component';

describe('CrossValidationComponent', () => {
  let component: CrossValidationComponent;
  let fixture: ComponentFixture<CrossValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrossValidationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrossValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
