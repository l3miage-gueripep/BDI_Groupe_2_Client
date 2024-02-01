export interface FestivalFilterQuery {
    [key: string]: string | undefined;
    lieuPrincipal?: string;
    nomManifestation: string;
    dateDebut: string;
    dateFin: string;
    sousDomaine: string;
}
