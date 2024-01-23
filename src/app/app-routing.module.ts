import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './authentication/register/register.component';
import {
  ResultSearchPageComponent
} from "./resultat-recherche/resultat-recherche-page/result-search-page.component";


const routes: Routes = [{ path: 'register', component: RegisterComponent },
  {path:'recherche', component: ResultSearchPageComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  


}
