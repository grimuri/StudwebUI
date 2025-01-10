import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { AuthenticationService } from '../data-access/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(): boolean | UrlTree {
    const user = this.authService.currentUserSig();
    if (user) {
      return true; // Użytkownik zalogowany, dostęp dozwolony
    } else {
      return this.router.createUrlTree(['/login']); // Przekierowanie do logowania
    }
  }
}