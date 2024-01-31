import {Component, Input, SimpleChanges} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {Router, RouterLink} from "@angular/router";
import {CovoiturageLieu} from "../../modele/covoiturageLieu.model";

@Component({
  selector: 'app-covoiturage-driver-card',
  templateUrl: './covoiturage-driver-card.component.html',
  styleUrl: './covoiturage-driver-card.component.scss'
})
export class CovoiturageDriverCardComponent {
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

    navigateToReservation() {
        this.router.navigate(['/reservation'], { queryParams: { query: this.covoiturageLieu.offreCovoiturage.idOffreCovoiturage } });
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
            this.arrivalCity = this.covoiturageLieu.offreCovoiturage.festival.nomManifestation;
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
