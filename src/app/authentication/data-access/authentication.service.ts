import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterUser } from '../model/register-user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private url = 'http://localhost:3000/users'

  constructor(private httpClient: HttpClient) { }

  getAll() {
    this.httpClient.get(this.url).subscribe(response => {
      console.log(response);
    })
  }

  add(registerUser: RegisterUser) {
    this.httpClient.post(this.url, registerUser).subscribe(response => {
      console.log(response);
    })
  }
}
