import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Festival} from "../modele/festival.model";
import {FilterQuery} from "../modele/filterQuery.model";
import {Covoiturage} from "../modele/covoiturage.model";
import { Adherent } from "../modele/adherent.model";
import {Observable} from "rxjs";
import {FestivalList} from "../modele/festivalList.model";
import {CovoiturageLieuList} from "../modele/covoiturageLieuList.model";
import { CovoiturageLieu } from '../modele/covoiturageLieu.model';
import { Panier } from '../modele/panier.model';

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
    return this.http.get<Festival[]>(`festival/${idFestival}`);
  }

  getFestivalsByFilter(query: FilterQuery, page?: number, size?: number) {
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
    this.http.delete(`panierOffre/${idPanierOffre}`).subscribe();
  }

  getPanierByUserMail(mail: string) {
    return this.http.get<Panier>(`panier/${mail}`);
  }

  getCarpools() {
    return this.http.get<CovoiturageLieuList>('covoiturage/');
  }
  getCarpoolByIdFestival(idFestival: string, page?: number, size?: number){
    let params = new HttpParams();

    if (page != null) {
      params = params.set('page', page.toString());
    }
    if (size != null) {
      params = params.set('size', size.toString());
    }
    return this.http.get<CovoiturageLieuList>(`covoiturage/festival/${idFestival}`,{params: params
    });
  }
  getCarpoolByIdOffre(idOffre: number){
    return this.http.get<Covoiturage[]>(`covoiturage/${idOffre}`);
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

}
