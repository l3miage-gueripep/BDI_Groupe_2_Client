import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Festival} from "../modele/festival.model";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  getFestivals() {
    return this.http.get<Festival[]>('festival/');
  }

}
