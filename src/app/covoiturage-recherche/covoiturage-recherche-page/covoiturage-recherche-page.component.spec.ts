import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovoiturageRecherchePageComponent } from './covoiturage-recherche-page.component';

describe('CovoiturageRecherchePageComponent', () => {
  let component: CovoiturageRecherchePageComponent;
  let fixture: ComponentFixture<CovoiturageRecherchePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CovoiturageRecherchePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CovoiturageRecherchePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
