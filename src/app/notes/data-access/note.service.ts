import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from '../model/note';
import { AuthenticationService } from '../../authentication/data-access/authentication.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private url = `${environment.api}/api/note`;
  authService = inject(AuthenticationService);
  router = inject(Router);

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<{ notes: Note[] }> {
    const token = this.authService.getCurrentUser()?.token;


    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    
    return this.httpClient.get<{ notes: Note[] }>(this.url, { headers });
  }
}
