import { CovoiturageLieu } from "./covoiturageLieu.model";
import { Festival } from "./festival.model";

export interface Panier {
    idPanier: number;
    datePanier: string;
    etat: string;
    userMail: string;
    panierOffres: PanierOffre[];
}

export interface PanierOffre {
    idPanierOffre: number;
    festival: Festival;
    quantite: number;
    covoiturageLieu: CovoiturageLieu;
}