import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map, shareReplay } from 'rxjs';
import { Panier, PanierOffre } from 'src/app/modele/panier.model';
import { AppService } from 'src/app/services/app.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-panier-page',
  templateUrl: './panier-page.component.html',
  styleUrls: ['./panier-page.component.scss']
})
export class PanierPageComponent {
  protected panier: Observable<Panier>;
  protected isLoading: boolean = true;
  protected panierOffres: PanierOffre[] = [];
  private panierId: number = -1;

  constructor(private appService: AppService, private firebaseService: FirebaseService, protected dialog: MatDialog, private router: Router, private snackBar: MatSnackBar) {
    //pas besoin de verifier si c'est nul ou non car l'utilisateur n'a pas le droit d'accéder à cette page s'il n'est pas connecté
    let userMail = this.firebaseService.user?.email;
    this.panier = this.appService.getPanierByUserMail(userMail!);

    this.panier.subscribe({
      next: panierData => {
        this.isLoading = false;
        this.panierOffres = panierData.panierOffres;
        this.panierId = panierData.idPanier;
      },
      error: error => {
        this.isLoading = false; 
      }
    });
  }


  protected getPrixTotal(panierOffre: PanierOffre): number {
    return (panierOffre.covoiturageLieu.prix + panierOffre.festival.tarifPass) * panierOffre.quantite;
  }

  downloadPdf(idPanier: number) {
    this.appService.downloadPdf(idPanier).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `pdf-download-${idPanier}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, error => {
      console.error('Download error:', error);
    });
  }

  protected openDialog(){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(hasPaid => {
      if(hasPaid){
        this.appService.payPanier(this.panierId).subscribe({
          next: (response) => {
            this.router.navigate(['/panier/accepted-payment']);
            this.downloadPdf(this.panierId)
          },
          error: (error) => {
            console.error('Payment failed:', error);
            this.snackBar.open('Paiement échoué: Pas assez de places ', 'Close');
          }
        });
      }
    });
  }

  protected reloadPanierOffre(idPanierOffre: number) {
    this.panierOffres = this.panierOffres.filter(panierOffre => panierOffre.idPanierOffre != idPanierOffre);
  }

}
