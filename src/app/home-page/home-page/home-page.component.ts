import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-page',
  standalone: true,
    imports: [
        MatButton
    ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  constructor( private router: Router) {
  }
  navigateToRecherche() {
    this.router.navigate(['/recherche'], { queryParams: { query: '' } });
  }
}
