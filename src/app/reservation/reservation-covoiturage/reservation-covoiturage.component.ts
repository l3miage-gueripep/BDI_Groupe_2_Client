import {Component, SimpleChanges} from '@angular/core';
import {CovoiturageLieu} from "../../modele/covoiturageLieu.model";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {AppService} from "../../services/app.service";
import {Covoiturage} from "../../modele/covoiturage.model";
import {CovoiturageLieuList} from "../../modele/covoiturageLieuList.model";

@Component({
  selector: 'app-reservation-covoiturage',
  templateUrl: './reservation-covoiturage.component.html',
  styleUrls: ['./reservation-covoiturage.component.scss']
})
export class ReservationCovoiturageComponent {

  constructor(private route: ActivatedRoute, private appService: AppService ) {
  }
  idOffreCovoiturage=0;
  nomManifestation = "";
  covoiturageLieu : CovoiturageLieu = {
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

  covoiturageLieus : CovoiturageLieu[] = [];
  offreCovoiturage= {
  conducteur: {
    idAdherent: 0,
    mail: '',
    nom: '',
    prenom: '',
    role: '',
    telephone: ''
  }};
  nbPassenger = 0;
  loadCovoiturageLieu(idOffreCovoiturage:number) {
    this.appService.getCovoiturageLieuByIdOffreCovoiturage(idOffreCovoiturage).subscribe(
        (data) => {
          this.covoiturageLieus = Array.isArray(data) ? data : [data];
          this.offreCovoiturage = data[0].offreCovoiturage
          console.log('this.covoiturage', this.covoiturageLieus)
        },
        (error) => {
          console.error('Error fetching covoiturage', error);
        }
    );
  }


  private updateProperties() {
    if (this.covoiturageLieus) {
      this.offreCovoiturage = this.covoiturageLieus[0].offreCovoiturage
    }
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.idOffreCovoiturage = params['query1'];
      this.nomManifestation = params['query2'];
      this.nbPassenger = params['query3'];
      if (this.idOffreCovoiturage) {
        this.loadCovoiturageLieu(this.idOffreCovoiturage);
      } else {

      }
    });
  }


}
