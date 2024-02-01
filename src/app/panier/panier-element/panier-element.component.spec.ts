import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanierElementComponent } from './panier-element.component';

describe('PanierElementComponent', () => {
  let component: PanierElementComponent;
  let fixture: ComponentFixture<PanierElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanierElementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PanierElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
