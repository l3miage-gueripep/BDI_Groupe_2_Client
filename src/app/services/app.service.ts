import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Festival} from "../modele/festival.model";
import {FilterQuery} from "../modele/filterQuery.model";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  getFestivals() {
    return this.http.get<Festival[]>('festival/');
  }

  getFestivalsById(name: string) {
    return this.http.get<Festival[]>(`festival/${name}`);
  }

  getFestivalsByFilter(query: FilterQuery) {
    return this.http.post<Festival[]>('http://localhost:4200/festival/filter', query, {
    });
  }

}
