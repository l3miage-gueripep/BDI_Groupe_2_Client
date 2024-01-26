import { Component, OnInit } from '@angular/core';
import {FirebaseService} from "../services/firebase.service";
import { AuthGuard } from "../services/permissions.service";
import { Router } from '@angular/router';

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

  constructor(private firebaseService: FirebaseService, private authGuard: AuthGuard, private router: Router) {
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
    this.user = this.authGuard.getUser();
    this.estConnecte = !!this.user;
    this.userName = this.estConnecte ? this.user.displayName : 'Utilisateur';
    console.log('user',this.user);
  }


}
