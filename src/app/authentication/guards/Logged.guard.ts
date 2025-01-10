import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../data-access/authentication.service';

@Injectable({ providedIn: 'root' })
export class LoggedGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(): boolean {
    const user = this.authService.currentUserSig();
    if (!user) {
      return true;
    } else {
      this.router.navigate(['/note']);
      return false;
    }
  }
}