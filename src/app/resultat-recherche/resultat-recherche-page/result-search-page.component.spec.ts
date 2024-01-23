import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultSearchPageComponent } from './result-search-page.component';

describe('ResultatRecherchePageComponent', () => {
  let component: ResultSearchPageComponent;
  let fixture: ComponentFixture<ResultSearchPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResultSearchPageComponent]
    });
    fixture = TestBed.createComponent(ResultSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
