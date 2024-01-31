import {Component, Input, SimpleChanges} from '@angular/core';
import {CovoiturageLieu} from "../../modele/covoiturageLieu.model";
import {Router} from "@angular/router";
import {MatCard, MatCardContent} from "@angular/material/card";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-reservation-card',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    DatePipe
  ],
  templateUrl: './reservation-card.component.html',
  styleUrl: './reservation-card.component.scss'
})
export class ReservationCardComponent {
  @Input() covoiturageLieu: CovoiturageLieu = {
    horaire: "",
    idCovoiturageLieu: 0,
    lieuCovoiturage: {adresseLieu: "", idLieu: "", latitude: 0, longitude: 0, nomLieu: "", typeLieu: ""},
    offreCovoiturage: {
      conducteur: {
        idAdherent: 0,
        mail: '',
        nom: '',
        prenom: '',
        role: '',
        telephone: ''
      },
      festival: {
        codePostal: '',
        dateDebut: '',
        dateFin: '',
        lieuPrincipal: '',
        nomManifestation: '',
        siteWeb: '',
        tarifPass: 0,
        sousDomaine: {
          nomDomaine: '',
          nomSousDomaine: ''
        }
      },
      idOffreCovoiturage: 0,
      modeleVoiture: "",
      nbPlaces: 1
    },
    prix: 0
  };

  nomConducteur: string ="";
  prenomConducteur: string ="";
  departureCity: string ="";
  arrivalCity: string ="";
  departureTime: string ="";
  arrivalTime: string ="";
  price: number=0;
  placeLibre: number=0;
  @Input() nomManifestation: string="";
  @Input() nbPassenger!: number;

  constructor( private router: Router) {
  }

  navigateToPanier() {
    this.router.navigate(['/panier'], { queryParams: { query:"" } });
  }






}
