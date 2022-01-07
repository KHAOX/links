import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URI = environment.apiUrl;

  headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  });

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }

  //Servicios de sesión.

  login(model = {}, data = {}) {
    const params = new URLSearchParams(data);

    const options = {
      headers: this.headers
    };

    return this.http.post(`${this.API_URI}/` + model, params.toString(), options).subscribe(
        res => {
          if((<any>res).token == '213123adsdsa21123ww'){
            localStorage.setItem('token', (<any>res).token);
            this.router.navigate(['dashboard']);
            this.toastr.success('Bienvenid@');
          }
        },
        error => {
          this.toastr.error('Error al iniciar Sesión');
        }
    );    
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
