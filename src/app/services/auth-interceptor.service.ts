import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}


  // Interceptor para enviar Token en cada Request.
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token: any = localStorage.getItem('token');

    let request = req;

    if (token) {
      request = req.clone({
        setHeaders: {
          Token: `${ token }`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {

        // (Hipotetico) Para casos en donde la Api retorne 401,403 el token no es valido y se restringe el acceso.
        if (err.status === 401 || err.status === 403) {
          this.router.navigateByUrl('/login');
          this.toastr.error(this.translate.instant('app.request.unauthorized'));
        }

        return throwError( err );

      })
    );
  }
}
