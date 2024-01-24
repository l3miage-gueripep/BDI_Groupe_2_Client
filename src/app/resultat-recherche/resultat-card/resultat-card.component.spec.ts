import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultatCardComponent } from './resultat-card.component';

describe('ResultatCardComponent', () => {
  let component: ResultatCardComponent;
  let fixture: ComponentFixture<ResultatCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultatCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResultatCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
