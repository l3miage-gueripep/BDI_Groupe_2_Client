import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PanierOffre} from "../../modele/panier.model";
import {DatePipe} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {AppService} from "../../services/app.service";
import {FirebaseService} from "../../services/firebase.service";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatFabButton, MatIconButton} from "@angular/material/button";

@Component({
  selector: 'app-panier-element',
  standalone: true,
  imports: [
    DatePipe,
    MatIcon,
    MatFabButton,
    MatIconButton
  ],
  templateUrl: './panier-element.component.html',
  styleUrl: './panier-element.component.scss'
})
export class PanierElementComponent {
  @Input() panierOffre!: PanierOffre;
  @Output() panierOffreRemoved = new EventEmitter<number>();
  constructor(private appService: AppService, protected dialog: MatDialog, private router: Router, private snackBar: MatSnackBar) {
  }

  increasePassenger() {
    this.panierOffre.quantite++;
    this.updateQuantite();
  }

  decreasePassenger() {
    if (this.panierOffre.quantite > 1) {
      this.panierOffre.quantite--;
      this.updateQuantite();
    }
  }

  updateQuantite() {
    this.appService.updateOffrePanier(this.panierOffre.idPanierOffre ,this.panierOffre.quantite).subscribe(
        (data) => {
          console.log('data',data)
        }
    )
  }
  protected getPrixTotal(panierOffre: PanierOffre): number {
    return (panierOffre.covoiturageLieu.prix + panierOffre.festival.tarifPass) * panierOffre.quantite;
  }

  protected removePanierOffre(panierOffreToRemove: PanierOffre) {
    this.appService.removePanierOffre(panierOffreToRemove.idPanierOffre).subscribe(() => {
      this.panierOffreRemoved.emit(this.panierOffre.idPanierOffre);
    });
  }

}
