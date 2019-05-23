import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(private toastr: ToastrService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      .handle(request)
      .pipe(
        tap(
          (event: HttpEvent<any>) => {
          },
          (resp: any) => {
            if (resp instanceof HttpErrorResponse) {
              // do error handling here
              let message = 'Unknown Error!';

              if (resp.error && resp.error.message) {
                // Backend 400-level error
                message = resp.error.message;
              } else if (resp.statusText) {
                // Other kind of error (500, API offline, etc.)
                message = resp.statusText;
              }

              // Hack to prevent semantic error messages from showing a popup error
              const whitelist = [
                'No active geocache'
              ];

              if (whitelist.includes(message)) {
                return;
              }

              this.toastr.error(message, 'Error!', {
                timeOut: 0
              });
            }
          }
        )
      );
  }
}
