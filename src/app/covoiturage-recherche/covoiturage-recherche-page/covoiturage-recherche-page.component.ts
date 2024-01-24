import { Component } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-covoiturage-recherche-page',
  providers: [provideNativeDateAdapter()],
  templateUrl: './covoiturage-recherche-page.component.html',
  styleUrl: './covoiturage-recherche-page.component.scss'
})
export class CovoiturageRecherchePageComponent {
  wordSearch = 'Musilac';
  nbResult = 20;
  departureFormControl = new FormControl('', [Validators.required]);
  arrivalFormControl = new FormControl('', [Validators.required]);
  nbPassenger = 2;

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  isFilterMenuOpen = false;
  filterSelected = 'Départ le plus tôt';
}
