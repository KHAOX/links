import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { tap, catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  API_URI = environment.apiUrl;

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  //Funciones http.

  get(endPoint = '') {
    const headers = this.headers;
    return this.http.get(`${this.API_URI}` + endPoint, { headers, responseType: 'text'});
  }

  post(endPoint = '', data = {}) {
    const params = new URLSearchParams(data);
    const options = {
      headers: this.headers
    };
    return this.http.post(`${this.API_URI}` + endPoint, params.toString(), options);
  }

  delete(endPoint = '', data = {}) {
    const options = {
      headers: this.headers
    };
    return this.http.delete(`${this.API_URI}` + endPoint + '/' + (<any>data).id, options);
  }
  
}
