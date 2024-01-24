import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationCovoiturageComponent } from './reservation-covoiturage/reservation-covoiturage.component';

import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    ReservationCovoiturageComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ]
})
export class ReservationModule { }
