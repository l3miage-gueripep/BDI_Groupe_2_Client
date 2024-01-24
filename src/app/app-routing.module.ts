import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './authentication/register/register.component';
import {
  ResultSearchPageComponent
} from "./resultat-recherche/resultat-recherche-page/result-search-page.component";
import {
  CovoiturageRecherchePageComponent
} from "./covoiturage-recherche/covoiturage-recherche-page/covoiturage-recherche-page.component";
import { UserComponent } from './authentication/user/user.component';
import { canActivateUser } from './services/permissions.service';
import { LoginComponent } from './authentication/login/login.component';
import { PanierPageComponent } from './panier/panier-page/panier-page.component';


const routes: Routes = [
  {path: 'register', component: RegisterComponent },
  {path: 'user', component: UserComponent, canActivate: [canActivateUser]},
  {path:'recherche', component: ResultSearchPageComponent },
  {path:'recherche/covoiturage', component: CovoiturageRecherchePageComponent},
  {path: 'login', component: LoginComponent },
  {path: 'panier', component: PanierPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
