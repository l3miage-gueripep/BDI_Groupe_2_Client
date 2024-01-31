import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedPaymentComponent } from './accepted-payment.component';

describe('AcceptedPaymentComponent', () => {
  let component: AcceptedPaymentComponent;
  let fixture: ComponentFixture<AcceptedPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcceptedPaymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcceptedPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
