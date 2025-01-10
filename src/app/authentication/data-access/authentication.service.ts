import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal, PLATFORM_ID, Inject, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RegisterUser } from '../model/register-user';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoginUser } from '../model/login-user';
import { response } from 'express';
import { User } from '../model/user';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private url = `${environment.api}/api`;
  currentUserSig = signal<User | null>(null);

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object) { 
      if (isPlatformBrowser(this.platformId)) {
        this.loadCurrentUser();
      }
  }

  loadCurrentUser(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user: User = JSON.parse(userData);
      this.currentUserSig.set(user);
    } else {
      this.currentUserSig.set(null);
    }
  }

  getCurrentUser(): User | null {
    return this.currentUserSig();
  }

  getAll() {
    this.httpClient.get(this.url).subscribe(response => {
      console.log(response);
    })
  }

  register(registerUser: RegisterUser): Observable<any> {
    return this.httpClient.post(this.url + "/register", registerUser);
  }

  login(loginUser: LoginUser): Observable<any> {
    console.log(`${environment.api}`);
    return this.httpClient.post(this.url + "/login", loginUser);
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
    this.currentUserSig.set(null);
    this.router.navigateByUrl('/');
  }
}
