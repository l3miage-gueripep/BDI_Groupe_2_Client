import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovoiturageDriverCardComponent } from './covoiturage-driver-card.component';

describe('CovoiturageDriverCardComponent', () => {
  let component: CovoiturageDriverCardComponent;
  let fixture: ComponentFixture<CovoiturageDriverCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CovoiturageDriverCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CovoiturageDriverCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
