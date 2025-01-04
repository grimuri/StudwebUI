import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterUser } from '../model/register-user';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoginUser } from '../model/login-user';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private url = 'http://localhost:5028/api'

  constructor(
    private router: Router,
    private httpClient: HttpClient) { }

  getAll() {
    this.httpClient.get(this.url).subscribe(response => {
      console.log(response);
    })
  }

  register(registerUser: RegisterUser): Observable<any> {
    return this.httpClient.post(this.url + "/register", registerUser);
  }

  login(loginUser: LoginUser): Observable<any> {
    return this.httpClient.post(this.url + "/login", loginUser);
  }
}
