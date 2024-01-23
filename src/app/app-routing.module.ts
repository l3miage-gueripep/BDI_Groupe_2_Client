import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './authentication/register/register.component';
import {
  ResultSearchPageComponent
} from "./resultat-recherche/resultat-recherche-page/result-search-page.component";
import {
  CovoiturageRecherchePageComponent
} from "./covoiturage-recherche/covoiturage-recherche-page/covoiturage-recherche-page.component";


const routes: Routes = [{ path: 'register', component: RegisterComponent },
  {path:'recherche', component: ResultSearchPageComponent },
  {path:'recherche/covoiturage', component: CovoiturageRecherchePageComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  


}
