import { Component } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {FormBuilder, FormsModule, ReactiveFormsModule, FormGroup, FormControl} from '@angular/forms';
import {JsonPipe, NgIf} from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();


@Component({
  selector: 'app-resultat-recherche-page',
  templateUrl: './result-search-page.component.html',
  styleUrls: ['./result-search-page.component.scss'],
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatButtonModule, MatMenuModule, MatCardModule, FormsModule, ReactiveFormsModule, MatCheckboxModule, JsonPipe, MatFormFieldModule, MatDatepickerModule, FormsModule, ReactiveFormsModule, NgIf, MatIcon, RouterLink],
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
  toppings = this._formBuilder.group({
    grenoble: false,
    lyon: false,
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


