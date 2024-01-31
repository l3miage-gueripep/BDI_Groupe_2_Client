import {Component, Input} from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-resultat-card',
  templateUrl: './resultat-card.component.html',
  styleUrl: './resultat-card.component.scss'
})
export class ResultatCardComponent {
    @Input() festivalName: string = 'Default Festival Name';
    @Input() codePostal: string = 'Default codePostale';
    @Input() lieuPrincipal : string = 'Default lieuPrincipal';
    @Input() siteWeb : string = 'Default siteWeb';
    @Input() startDate: string = 'Default StartDate';
    @Input() endDate: string = 'Default EndDate';
    @Input() price: number = 0;
    @Input() nomDomaine: string = 'Default nomDomaine';
    constructor( private router: Router) {}
    navigateToCovoiturage() {
        this.router.navigate(['recherche/covoiturage'], { queryParams: { query: this.festivalName } });
    }

    getImagePath() {
      switch (this.nomDomaine) {
            case 'Musiques classiques':
                return 'assets/musiqueClassique.jpg';
            case 'Livre et littérature':
                return 'assets/livreEtLitterature.jpg';
            case 'Musiques actuelles' :
                return 'assets/musiqueActuelle.jpg';
            case 'Pluridisciplinaire Spectacle vivant' :
                return 'assets/pluridisciplinaireSpectacle.jpg';
            case 'Cirque et Arts de la rue' :
                return 'assets/cirqueEtArts.jpg';
            case'Divers Spectacle vivant' :
                return 'assets/diversSpectacle.jpg';
            case 'Transdisciplinaire' :
                return 'assets/transdisciplinaire.jpg';
            case 'Cinéma et audiovisuel' :  
                return 'assets/cinemaEtAudiovisuel.jpg';
            case 'Pluridisciplinaire Musique' : 
                return 'assets/pluridisciplinaireMusique.jpg';
            case 'Danse' :
                return 'assets/danse.jpg';
            case 'Arts plastiques et visuels' :
                return 'assets/artsPlastiques.jpg';
            case 'Domaines divers'  :
                return 'assets/domainesDivers.jpg';
            case 'Théâtre' :
                return 'assets/theatre.jpg';
            default:
                return 'assets/billet.jpg';
      }
  }
}
