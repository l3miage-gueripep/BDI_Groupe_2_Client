import { Component } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {FormBuilder, FormsModule, ReactiveFormsModule, FormGroup, FormControl} from '@angular/forms';
import {JsonPipe} from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();
@Component({
  selector: 'app-resultat-recherche-page',
  templateUrl: './result-search-page.component.html',
  styleUrls: ['./result-search-page.component.css'],
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatButtonModule, MatMenuModule, MatCardModule, FormsModule, ReactiveFormsModule, MatCheckboxModule, JsonPipe, MatFormFieldModule, MatDatepickerModule, FormsModule, ReactiveFormsModule],
})
export class ResultSearchPageComponent {
  wordSearch = 'grenoble';
  nbResult = 16;
  isFilterMenuOpen = false;
  isCityMenuOpen = false;
  isCategoriesMenuOpen = false;
  filterSelected= 'Par pertinence'
  citySelected='grenoble'
  categoriesSelected='rock'
  toppings = this._formBuilder.group({
    pepperoni: false,
    extracheese: false,
    mushroom: false,
  });

  constructor(private _formBuilder: FormBuilder) {}

  campaignOne = new FormGroup({
    start: new FormControl(new Date(year, month, 13)),
    end: new FormControl(new Date(year, month, 16)),
  });
  campaignTwo = new FormGroup({
    start: new FormControl(new Date(year, month, 15)),
    end: new FormControl(new Date(year, month, 19)),
  });
}


