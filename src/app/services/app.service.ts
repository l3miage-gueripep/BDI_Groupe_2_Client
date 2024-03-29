import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Festival} from "../modele/festival.model";
import {FestivalFilterQuery} from "../modele/filterQuery.model";
import {Covoiturage} from "../modele/covoiturage.model";
import { Adherent } from "../modele/adherent.model";
import {Observable} from "rxjs";
import {FestivalList} from "../modele/festivalList.model";
import {CovoiturageLieuList} from "../modele/covoiturageLieuList.model";
import { CovoiturageLieu } from '../modele/covoiturageLieu.model';
import {Panier, PanierOffre} from '../modele/panier.model';
import { CovoiturageLieuFilter } from '../modele/covoiturage-lieu-filter.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {


  constructor(private http: HttpClient) { }

  getFestivals(page?: number, size?: number): Observable<FestivalList> {
    let params = new HttpParams();

    if (page != null) {
      params = params.set('page', page.toString());
    }
    if (size != null) {
      params = params.set('size', size.toString());
    }

    return this.http.get<FestivalList>('festival/', { params: params });
  }

  getFestivalsByDate(page?: number, size?: number): Observable<FestivalList> {
    let params = new HttpParams();

    if (page != null) {
      params = params.set('page', page.toString());
    }
    if (size != null) {
      params = params.set('size', size.toString());
    }

    return this.http.get<FestivalList>('festival/date', { params: params });
  }

  getAllCity() {
    return this.http.get<string[]>('festival/allCity');
  }

  saveCitiesToLocal(data: string[]): void {
    localStorage.setItem('cities', JSON.stringify(data));
  }

  getAllDomaine() {
    return this.http.get<string[]>('festival/allDomaine');
  }

  saveDomaineToLocal(data: string[]): void {
    localStorage.setItem('domaines', JSON.stringify(data));
  }

  getFestivalsById(idFestival: string) {
    return this.http.get<Festival>(`festival/${idFestival}`);
  }

  payPanier(idPanier: number) {
    return this.http.patch(`panier/pay/${idPanier}`, {});
  }

  getFestivalsByFilter(query: FestivalFilterQuery, page?: number, size?: number) {
    let params = new HttpParams();

    if (page != null) {
      params = params.set('page', page.toString());
    }
    if (size != null) {
      params = params.set('size', size.toString());
    }

    return this.http.post<FestivalList>('festival/filter', query, {params: params
    });
  }

  removePanierOffre(idPanierOffre: number) {
    return this.http.delete(`panierOffre/${idPanierOffre}`);
  }

  getPanierByUserMail(mail: string) {
    return this.http.get<Panier>(`panier/${mail}`);
  }

  getCarpools() {
    return this.http.get<CovoiturageLieuList>('covoiturage/');
  }

  postAdherent(query: Adherent) {
    return this.http.post<Adherent>('adherent/', query, {
    });
  }

  getAllCovoiturageLieu(page?: number, size?: number){
    let params = new HttpParams();

    if (page != null) {
      params = params.set('page', page.toString());
    }
    if (size != null) {
      params = params.set('size', size.toString());
    }
    return this.http.get<CovoiturageLieuList>(`covoiturageLieu/`,{ params: params });
  }

  getCovoiturageLieuByFestival(nomManifestation: string, page?: number, size?: number) {
    let params = new HttpParams();

    if (page != null) {
      params = params.set('page', page.toString());
    }
    if (size != null) {
      params = params.set('size', size.toString());
    }
    return this.http.get<CovoiturageLieuList>(`festival/${nomManifestation}/covoituragelieu`,{ params: params })
  }

  getCovoiturageLieuByFestivalAndFilter(nomManifestation: string, query: CovoiturageLieuFilter, page?: number, size?: number) {
    return this.http.post<CovoiturageLieuList>(`festival/${nomManifestation}/covoituragelieu/filter`, query, {});
  }

  getCovoiturageLieuByIdOffreCovoiturage(idOffreCovoiturage: number) {
    return this.http.get<CovoiturageLieu[]>(`covoiturageLieu/${idOffreCovoiturage}`);
  }

  getCovoiturageLieuById(idCovoiturageLieu: number) {
    return this.http.get<CovoiturageLieu>(`covoiturageLieu/byid/${idCovoiturageLieu}`);
  }

  postOffrePanier(query: any) {
    return this.http.post<any>('panier/add/', query, {
    });
  }

  updateOffrePanier(idOffre: number, quantite: number) {
    return this.http.patch<PanierOffre>(`panierOffre/${idOffre}`,quantite)
  }

  downloadPdf(idPanier: number): Observable<Blob> {
    return this.http.get(`download-pdf/${idPanier}`, { responseType: 'blob' });
  }
}
