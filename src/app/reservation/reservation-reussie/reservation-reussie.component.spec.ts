import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationReussieComponent } from './reservation-reussie.component';

describe('ReservationReussieComponent', () => {
  let component: ReservationReussieComponent;
  let fixture: ComponentFixture<ReservationReussieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationReussieComponent]
    });
    fixture = TestBed.createComponent(ReservationReussieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
