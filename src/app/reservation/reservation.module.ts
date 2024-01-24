import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationCovoiturageComponent } from './reservation-covoiturage/reservation-covoiturage.component';

import {MatIconModule} from '@angular/material/icon';
import { ReservationReussieComponent } from './reservation-reussie/reservation-reussie.component';
import { AppRoutingModule } from '../app-routing.module';


@NgModule({
  declarations: [
    ReservationCovoiturageComponent,
    ReservationReussieComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    AppRoutingModule
  ]
})
export class ReservationModule { }
