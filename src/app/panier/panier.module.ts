import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanierPageComponent } from './panier-page/panier-page.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon';
import { AcceptedPaymentComponent } from './accepted-payment/accepted-payment.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    PanierPageComponent,
    ConfirmationDialogComponent,
    AcceptedPaymentComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressBarModule,
    MatIconModule,
    RouterModule
  ]
})
export class PanierModule { }
