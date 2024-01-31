import {Component, SimpleChanges} from '@angular/core';
import {CovoiturageLieu} from "../../modele/covoiturageLieu.model";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AppService} from "../../services/app.service";
import {Covoiturage} from "../../modele/covoiturage.model";
import {CovoiturageLieuList} from "../../modele/covoiturageLieuList.model";
import {AuthGuard} from "../../services/permissions.service";
import {getAuth} from "firebase/auth";
import {FirebaseService} from "../../services/firebase.service";

@Component({
  selector: 'app-reservation-covoiturage',
  templateUrl: './reservation-covoiturage.component.html',
  styleUrls: ['./reservation-covoiturage.component.scss']
})
export class ReservationCovoiturageComponent {

  constructor(private firebaseService: FirebaseService,private router: Router, private route: ActivatedRoute, private appService: AppService, private authGuard: AuthGuard ) {
  }
  user: any;
  idCovoiturageLieu=0;
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
  panier:any;
  loadCovoiturageLieu(idOffreCovoiturage:number) {
    this.appService.getCovoiturageLieuById(idOffreCovoiturage).subscribe(
        (data) => {
          this.covoiturageLieu = data;
          console.log('this.covoiturage', this.covoiturageLieu)
        },
        (error) => {
          console.error('Error fetching covoiturage', error);
        }
    );
  }

  ngOnInit() {
    this.user = getAuth();
    this.route.queryParams.subscribe(params => {
      this.idCovoiturageLieu = params['query1'];
      this.nomManifestation = params['query2'];
      this.nbPassenger = params['query3'];
      if (this.idCovoiturageLieu) {
        this.loadCovoiturageLieu(this.idCovoiturageLieu);
      } else {

      }
    });
  }

  ajouterAuPanier(){
    let userMail = this.firebaseService.user?.email;
    const query = {
      idCovoiturageLieu: this.covoiturageLieu.idCovoiturageLieu,
      quantite: this.nbPassenger,
      userMail: userMail
    }
    console.log("this.user", this.user)
    console.log("query",query)
    this.appService.postOffrePanier(query).subscribe(
        (data) => {
            this.panier= data;
          this.router.navigate(['/reservationReussie']);
          console.log('this.panier',this.panier)
        },
        (error) => {
          console.error('Error posting panier', error);
        }
    )
  }

}
