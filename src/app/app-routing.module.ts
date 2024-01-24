import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './authentication/register/register.component';
import { PanierPageComponent } from './panier/panier-page/panier-page.component';
import { ReservationCovoiturageComponent } from './reservation/reservation-covoiturage/reservation-covoiturage.component';
import { ReservationReussieComponent } from './reservation/reservation-reussie/reservation-reussie.component';


const routes: Routes = [{ path: 'register', component: RegisterComponent },{ path: 'panier', component: PanierPageComponent },{ path: 'reservation', component: ReservationCovoiturageComponent },{ path: 'reservationReussie', component: ReservationReussieComponent },];


@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
