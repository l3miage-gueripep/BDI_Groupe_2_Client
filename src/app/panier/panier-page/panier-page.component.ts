import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map, shareReplay } from 'rxjs';
import { Panier, PanierOffre } from 'src/app/modele/panier.model';
import { AppService } from 'src/app/services/app.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-panier-page',
  templateUrl: './panier-page.component.html',
  styleUrls: ['./panier-page.component.scss']
})
export class PanierPageComponent {
  protected panier: Observable<Panier>;
  protected isLoading: boolean = true;
  protected panierOffres: PanierOffre[] = [];

  constructor(private appService: AppService, private firebaseService: FirebaseService, protected dialog: MatDialog) { 
    //pas besoin de verifier si c'est nul ou non car l'utilisateur n'a pas le droit d'accéder à cette page s'il n'est pas connecté
    let userMail = firebaseService.user?.email;
    this.panier = this.appService.getPanierByUserMail(userMail!);

    this.panier.subscribe(panierData => {
      this.isLoading = false; // Mettez à jour isLoading lorsque les données sont chargées
      this.panierOffres = panierData.panierOffres;
      // Autre code ici
    });
  }

  protected getPrixTotal(panierOffre: PanierOffre): number {
    return (panierOffre.covoiturageLieu.prix + panierOffre.festival.tarifPass) * panierOffre.quantite;
  }

  protected openDialog(){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  protected removePanierOffre(panierOffreToRemove: PanierOffre) {
    this.appService.removePanierOffre(panierOffreToRemove.idPanierOffre);
    //remove de la liste en local
    this.panierOffres = this.panierOffres.filter(panierOffre => panierOffre.idPanierOffre != panierOffreToRemove.idPanierOffre);
  }
}
