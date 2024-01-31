import { Injectable, inject } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { UrlTree, Router, ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private firebaseService: FirebaseService, private router: Router, private _snackBar: MatSnackBar) { 
  }

  canActivate(redirectTo: string): UrlTree | boolean {
    if (!this.firebaseService.user) {
      this._snackBar.open("Vous devez être connecté pour accéder à cette page", "OK", {duration: 3000, panelClass: ['snackbar-error']});
      return this.router.createUrlTree(['login'], { queryParams: { returnUrl: redirectTo } });
    }
    else{
      return true;
    }
  }

  public getUser() {
    return this.firebaseService.user;
  }
}

export const canActivateUser: CanActivateFn =
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(AuthGuard).canActivate(state.url);
};