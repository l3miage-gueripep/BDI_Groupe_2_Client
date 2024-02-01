import {Component, Input} from '@angular/core';
import {CovoiturageLieu} from "../../modele/covoiturageLieu.model";
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";
import {AppService} from "../../services/app.service";
import {DatePipe} from "@angular/common";
import {DialogComponent} from "../../dialog/dialog.component";
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-offre-covoiturage',
  standalone: true,
  imports: [
    MatButton,
    DatePipe,
  ],
  templateUrl: './offre-covoiturage.component.html',
  styleUrl: './offre-covoiturage.component.scss'
})
export class OffreCovoiturageComponent {
  @Input() offreCovoiturage!: CovoiturageLieu;
  @Input() nomManifestation!: string;
  @Input() nbPassenger!: number;

  constructor( private router: Router, private appService: AppService, public dialog: MatDialog) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {data: {nbPassenger: this.nbPassenger}});
  }

handleClic() {
    if(this.offreCovoiturage.offreCovoiturage.nbPlaces<this.nbPassenger){
      this.openDialog()
    }else {
      this.navigateToReservation()
    }
}
  navigateToReservation() {
    this.router.navigate(['/reservation'], { queryParams: { query1: this.offreCovoiturage.idCovoiturageLieu, query2: this.nomManifestation , query3: this.nbPassenger} });
  }
}
