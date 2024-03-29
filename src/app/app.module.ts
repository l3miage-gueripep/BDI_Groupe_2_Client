import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { AuthenticationModule } from './authentication/authentication.module';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { CovoiturageRechercheModule } from './covoiturage-recherche/covoiturage-recherche.module';
import { ReservationModule } from './reservation/reservation.module';
import { ResultatRechercheModule } from "./resultat-recherche/resultat-recherche.module";
import { MatMenuModule } from '@angular/material/menu';
import { PanierModule } from './panier/panier.module';

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    AuthenticationModule,
    MatCheckboxModule,
    CovoiturageRechercheModule,
    MatIconModule,
    ReservationModule,
    MatMenuModule,
    ResultatRechercheModule,
    FormsModule,
    PanierModule
    /**
     * StoreModule.forRoot is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.

     StoreModule.forRoot(reducers, { metaReducers }),

     /**
     * @ngrx/router-store keeps router state up-to-date in the store.

     StoreRouterConnectingModule,

     /**
     * Store devtools instrument the store retaining past versions of state
     * and recalculating new states. This enables powerful time-travel
     * debugging.
     *
     * To use the debugger, install the Redux Devtools extension for either
     * Chrome or Firefox
     *
     * See: https://github.com/zalmoxisus/redux-devtools-extension

         !environment.production ? StoreDevtoolsModule.instrument() : [],

     /**
     * EffectsModule.forRoot() is imported once in the root module and
     * sets up the effects class to be initialized immediately when the
     * application starts.
     *
     * See: https://github.com/ngrx/platform/blob/master/docs/effects/api.md#forroot
     */
  ],
  providers: [{provide: LOCALE_ID, useValue: 'fr' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
