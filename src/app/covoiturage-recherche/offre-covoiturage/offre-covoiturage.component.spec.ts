import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffreCovoiturageComponent } from './offre-covoiturage.component';

describe('OffreCovoiturageComponent', () => {
  let component: OffreCovoiturageComponent;
  let fixture: ComponentFixture<OffreCovoiturageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffreCovoiturageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OffreCovoiturageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
