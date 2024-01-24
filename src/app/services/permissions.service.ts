import { Injectable, inject } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { UrlTree, Router, ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private firebaseService: FirebaseService, private router: Router) { 
  }

  canActivate(redirectTo: string): UrlTree | boolean {
    if (!this.firebaseService.user) {
      return this.router.createUrlTree(['login'], { queryParams: { returnUrl: redirectTo } });
    }
    else{
      return true;
    }
  }
}

export const canActivateUser: CanActivateFn =
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(AuthGuard).canActivate(state.url);
};