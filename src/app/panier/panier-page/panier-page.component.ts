import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/services/app.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-panier-page',
  templateUrl: './panier-page.component.html',
  styleUrls: ['./panier-page.component.scss']
})
export class PanierPageComponent {
  protected panier: Observable<any>;

  constructor(private appService: AppService, private firebaseService: FirebaseService) { 
    //pas besoin de verifier si c'est nul ou non car l'utilisateur n'a pas le droit d'accéder à cette page s'il n'est pas connecté
    let userMail = firebaseService.user?.email;
    this.panier = this.appService.getFestivalsById(userMail!);
  }
}
