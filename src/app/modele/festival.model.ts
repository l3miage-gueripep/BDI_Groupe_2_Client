export interface Festival {
    codePostal: string;
    dateDebut: string;
    dateFin: string;
    lieuPrincipal: string;
    nomManifestation: string;
    siteWeb: string;
    tarifPass: number;
    sousDomaine :{
        nomDomaine: string,
        nomSousDomaine: string,
    }
}