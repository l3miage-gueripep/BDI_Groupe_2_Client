import {Conducteur} from "./conducteur.model";
import {Festival} from "./festival.model";

export interface CovoiturageLieu {
    horaire:string,
    idCovoiturageLieu: number,
    lieuCovoiturage:{
        idLieu:string,
        nomLieu: string,
        adresseLieu: string,
        latitude: number,
        longitude: number,
        typeLieu: string
        },
    offreCovoiturage : {
        idOffreCovoiturage: number,
        modeleVoiture: string,
        nbPlaces: 1,
        conducteur: Conducteur,
        festival: Festival,
    },
    prix: number
}