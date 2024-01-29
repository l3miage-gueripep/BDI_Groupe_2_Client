import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './authentication/register/register.component';
import {
  ResultSearchPageComponent
} from "./resultat-recherche/resultat-recherche-page/result-search-page.component";
import {
  CovoiturageRecherchePageComponent
} from "./covoiturage-recherche/covoiturage-recherche-page/covoiturage-recherche-page.component";
import { canActivateUser } from './services/permissions.service';
import { LoginComponent } from './authentication/login/login.component';
import { PanierPageComponent } from './panier/panier-page/panier-page.component';
import { ReservationCovoiturageComponent } from './reservation/reservation-covoiturage/reservation-covoiturage.component';
import { ReservationReussieComponent } from './reservation/reservation-reussie/reservation-reussie.component';
import {HomePageComponent} from "./home-page/home-page/home-page.component";


const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'register', component: RegisterComponent },
  { path:'recherche', component: ResultSearchPageComponent },
  { path:'recherche/covoiturage', component: CovoiturageRecherchePageComponent},
  { path: 'login', component: LoginComponent },
  { path: 'panier', component: PanierPageComponent},
  { path: 'reservation', component: ReservationCovoiturageComponent },
  { path: 'reservationReussie', component: ReservationReussieComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
