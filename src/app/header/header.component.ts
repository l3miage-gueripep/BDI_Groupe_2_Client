import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private router: Router) {}

  searchQuery: string = '';
  navigateToRecherche() {
    this.router.navigate(['/recherche'], { queryParams: { query: this.searchQuery } });
  }


}
