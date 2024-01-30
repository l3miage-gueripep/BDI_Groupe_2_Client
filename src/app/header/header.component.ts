import { Component, OnInit } from '@angular/core';
import {FirebaseService} from "../services/firebase.service";
import { AuthGuard } from "../services/permissions.service";
import { Router } from '@angular/router';
import {getAuth, onAuthStateChanged} from "firebase/auth";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  searchQuery: string = '';
  navigateToRecherche() {
    this.router.navigate(['/recherche'], { queryParams: { query: this.searchQuery } });
  }

  constructor( private firebaseService: FirebaseService, private authGuard: AuthGuard, private router: Router) {
  }

  user: any;
  estConnecte: boolean = false;
  userName: string = 'Utilisateur';

  public async logout() {
    try {
      await this.firebaseService.logout();

    } catch (error) {
      console.error('Logout failed', error);
    }
  }

  ngOnInit() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = this.authGuard.getUser();
        this.estConnecte = true;
        this.userName = user.displayName || 'Utilisateur';
      } else {
        this.estConnecte = false;
        this.userName = 'Utilisateur';
      }
    });

    this.firebaseService.currentPrenom.subscribe(prenom => {
      if (this.estConnecte) {
        this.userName = prenom || this.user.displayName;
      } else {
        this.userName = 'Utilisateur';
      }
      console.log('userName updated to', this.userName);
    });
  }


}
