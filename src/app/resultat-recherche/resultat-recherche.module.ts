import { NgModule } from '@angular/core';
import {CommonModule, JsonPipe, NgIf} from '@angular/common';
import { ResultSearchPageComponent } from './resultat-recherche-page/result-search-page.component';
import {ResultatCardComponent} from "./resultat-card/resultat-card.component";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatCardModule} from "@angular/material/card";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {MatOption, provideNativeDateAdapter} from "@angular/material/core";
import {MatAutocomplete, MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {MatIconModule} from '@angular/material/icon';
import {MatInput, MatInputModule} from '@angular/material/input';
import {MatPaginator} from "@angular/material/paginator";
import {MatProgressBarModule} from '@angular/material/progress-bar';


@NgModule({
  declarations: [
      ResultatCardComponent,
      ResultSearchPageComponent
  ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatMenuModule,
        MatCardModule,
        FormsModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        JsonPipe,
        MatFormFieldModule,
        MatDatepickerModule,
        FormsModule,
        ReactiveFormsModule,
        NgIf,
        MatIcon,
        RouterLink,
        MatInput,
        MatAutocomplete,
        MatOption,
        MatAutocompleteTrigger,
        MatPaginator,
        MatProgressBarModule
    ],
  providers: [provideNativeDateAdapter()],
})
export class ResultatRechercheModule { }
