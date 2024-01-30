export interface FilterQuery {
    [key: string]: string | undefined;
    lieuPrincipal?: string;
    dateDebut: string;
    dateFin: string;
    cityDeparture: string;
    nomDomaine: string;
}
