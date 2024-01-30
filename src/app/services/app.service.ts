import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Festival} from "../modele/festival.model";
import {FilterQuery} from "../modele/filterQuery.model";
import {Covoiturage} from "../modele/covoiturage.model";
import { Adherent } from "../modele/adherent.model";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  getFestivals() {
    return this.http.get<Festival[]>('festival/');
  }

  getAllCity() {
    return this.http.get<string[]>('festival/allCity');
  }

  saveCitiesToLocal(data: string[]): void {
    localStorage.setItem('cities', JSON.stringify(data));
  }

  getFestivalsById(idFestival: string) {
    return this.http.get<Festival[]>(`festival/${idFestival}`);
  }

  getFestivalsByFilter(query: FilterQuery) {
    return this.http.post<Festival[]>('festival/filter', query, {
    });
  }

  getCarpools() {
    return this.http.get<Covoiturage[]>('covoiturage/');
  }
  getCarpoolByIdFestival(idFestival: string){
    return this.http.get<Covoiturage[]>(`covoiturage/festival/${idFestival}`);
  }
  getCarpoolByIdOffre(idOffre: number){
    return this.http.get<Covoiturage[]>(`covoiturage/${idOffre}`);
  }

  postAdherent(query: Adherent) {
    return this.http.post<Adherent>('adherent/', query, {
    });
  }
}
