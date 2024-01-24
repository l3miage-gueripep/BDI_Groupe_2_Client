import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationCovoiturageComponent } from './reservation-covoiturage.component';

describe('ReservationCovoiturageComponent', () => {
  let component: ReservationCovoiturageComponent;
  let fixture: ComponentFixture<ReservationCovoiturageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationCovoiturageComponent]
    });
    fixture = TestBed.createComponent(ReservationCovoiturageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
