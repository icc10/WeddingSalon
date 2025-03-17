import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/email';

@Injectable({
  providedIn: 'root'
})

export class EmailService {

  constructor(private http: HttpClient) { }

  create(emailData: any): Observable<any> {
    return this.http.post(`${baseUrl}`, emailData);
  }
}
