import { Component } from '@angular/core';
import {CovoiturageLieu} from "../../modele/covoiturageLieu.model";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {AppService} from "../../services/app.service";

@Component({
  selector: 'app-reservation-covoiturage',
  templateUrl: './reservation-covoiturage.component.html',
  styleUrls: ['./reservation-covoiturage.component.scss']
})
export class ReservationCovoiturageComponent {

  constructor(private route: ActivatedRoute, private appService: AppService ) {
  }
  idOffreCovoiturage=0;
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
/*
  loadCovoiturageLieu(idOffreCovoiturage:number) {
    this.appService.ge(name).subscribe(
        (data) => {
          this.festivals = Array.isArray(data) ? data : [data];
          this.nbResult = 1

          this.queryByName = name;
        },
        (error) => {
          console.error('Error fetching festivals', error);
        }
    );
  }


  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.idCovoiturageLieu = params['query'];
      if (this.idCovoiturageLieu) {

        console.log("this.covoiturageLieu", this.covoiturageLieu.offreCovoiturage)
      } else {

      }
    });
  }
   */

}
