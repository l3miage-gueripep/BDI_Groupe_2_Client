import { Component } from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCard, MatCardContent} from "@angular/material/card";
import {JsonPipe} from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatButton} from "@angular/material/button";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatMenu} from "@angular/material/menu";
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {CovoiturageDriverCardComponent} from "../covoiturage-driver-card/covoiturage-driver-card.component";
@Component({
  selector: 'app-covoiturage-recherche-page',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatCard, MatCardContent, MatFormFieldModule, MatDatepickerModule, FormsModule, ReactiveFormsModule, JsonPipe, MatButton, MatCheckbox, MatMenu, MatButtonModule, MatMenuModule, CovoiturageDriverCardComponent],
  providers: [provideNativeDateAdapter()],
  templateUrl: './covoiturage-recherche-page.component.html',
  styleUrl: './covoiturage-recherche-page.component.scss'
})
export class CovoiturageRecherchePageComponent {
  wordSearch= 'Musilac';
  nbResult = 20;
  departureFormControl = new FormControl('', [Validators.required]);
  arrivalFormControl = new FormControl('', [Validators.required]);
  nbPassenger = 2;
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  isFilterMenuOpen = false;
  filterSelected='Départ le plus tôt';
}
