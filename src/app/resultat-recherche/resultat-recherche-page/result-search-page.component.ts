import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {provideNativeDateAdapter} from "@angular/material/core";

@Component({
  selector: 'app-resultat-recherche-page',
  providers: [provideNativeDateAdapter()],
  templateUrl: './result-search-page.component.html',
  styleUrls: ['./result-search-page.component.scss'],
})
export class ResultSearchPageComponent {
  wordSearch = 'grenoble';
  nbResult = 16;
  isFilterMenuOpen = false;
  isCityMenuOpen = false;
  isCategoriesMenuOpen = false;
  isChoiceBarVisible: boolean = true;
  filterSelected= 'Par pertinence'
  citySelected='grenoble'
  categoriesSelected='rock'
  cities = this._formBuilder.group({
    grenoble: false,
    lyon: false,
  });

  categories = this._formBuilder.group({
    pop: false,
    rock: false,
  });
  constructor(private _formBuilder: FormBuilder) {}

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  toggleChoiceBar() {
    this.isChoiceBarVisible = !this.isChoiceBarVisible;
  }
}


