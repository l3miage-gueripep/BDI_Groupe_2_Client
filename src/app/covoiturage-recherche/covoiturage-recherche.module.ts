import { NgModule } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { CovoiturageDriverCardComponent } from './covoiturage-driver-card/covoiturage-driver-card.component';
import { RouterLink } from '@angular/router';
import { CovoiturageRecherchePageComponent } from './covoiturage-recherche-page/covoiturage-recherche-page.component';
import {MatIcon} from "@angular/material/icon";
import {MatPaginator} from "@angular/material/paginator";
import {OffreCovoiturageComponent} from "./offre-covoiturage/offre-covoiturage.component";
import {MatProgressBarModule} from '@angular/material/progress-bar';



@NgModule({
  declarations: [
    CovoiturageDriverCardComponent,
    CovoiturageRecherchePageComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatCard,
        MatCardContent,
        MatFormFieldModule,
        MatDatepickerModule,
        FormsModule,
        ReactiveFormsModule,
        JsonPipe,
        MatButton,
        MatCheckbox,
        MatMenu,
        MatButtonModule,
        MatMenuModule,
        MatButton,
        RouterLink,
        MatIcon,
        MatPaginator,
        OffreCovoiturageComponent,
        MatProgressBarModule
    ]
})
export class CovoiturageRechercheModule { }
