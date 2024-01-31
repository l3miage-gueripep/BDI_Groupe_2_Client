import {Component, Input, SimpleChanges} from '@angular/core';
import {CovoiturageLieu} from "../../modele/covoiturageLieu.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reservation-card',
  standalone: true,
  imports: [],
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

  constructor( private router: Router) {
    this.clearProperties();
  }

  navigateToPanier() {
    this.router.navigate(['/reservation'], { queryParams: { query:"" } });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['covoiturageLieu']) {
      this.updateProperties();
    }
  }

  private updateProperties() {
    if (this.covoiturageLieu) {
      this.nomConducteur = this.covoiturageLieu.offreCovoiturage.conducteur.nom;
      this.prenomConducteur = this.covoiturageLieu.offreCovoiturage.conducteur.prenom;
      this.departureCity = this.covoiturageLieu.lieuCovoiturage.nomLieu;
      this.departureTime = this.covoiturageLieu.horaire;
      this.arrivalTime = this.covoiturageLieu.horaire;
      this.price = this.covoiturageLieu.prix;
      this.placeLibre = this.covoiturageLieu.offreCovoiturage.nbPlaces;
    } else {
      this.clearProperties();
    }
  }

  private clearProperties() {
    this.nomConducteur = '';
    this.prenomConducteur = '';
    this.departureCity = '';
    this.arrivalCity = '';
    this.departureTime = '';
    this.arrivalTime = '';
    this.price = 0;
    this.placeLibre = 0;
  }

}
