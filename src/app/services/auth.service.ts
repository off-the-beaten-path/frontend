import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, tap } from 'rxjs/operators';
import { IUser } from '../models';
import { ToastrService } from 'ngx-toastr';

interface IAuthResponse {
  jwt: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<IUser>;
  public currentUser: Observable<IUser>;

  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.currentUserSubject = new BehaviorSubject<IUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): IUser {
    return this.currentUserSubject.value;
  }

  login({password, email}: { password: string, email: string }): Observable<null> {
    return this.http
      .post<IAuthResponse>(`${environment.api}/user/login`, {password, email})
      .pipe(
        tap(
          next => {
            if (next && next.jwt) {
              localStorage.setItem('currentUser', JSON.stringify(next));
              this.currentUserSubject.next(next);

              this.toastr.success('Login successful');
            }
          }
        ),
        map(
          () => null
        )
      );
  }

  register({password, email}: { password: string, email: string }): Observable<null> {
    return this.http
      .post<IAuthResponse>(`${environment.api}/user/register`, {password, email})
      .pipe(
        tap(
          next => {
            if (next && next.jwt) {
              localStorage.setItem('currentUser', JSON.stringify(next));
              this.currentUserSubject.next(next);

              this.toastr.success('Registration successful');
            }
          }
        ),
        map(
          () => null
        )
      );
  }

  changePassword({old, pass}: {old: string, pass: string}): Observable<null> {
    return this.http
      .put<{}>(`${environment.api}/user/password`, {old, new: pass})
      .pipe(
        tap(
          () => {
            this.toastr.success('Password successfully changed');
          }
        ),
        map(
          () => null
        )
      );
  }

  refresh(): Observable<IAuthResponse> {
    return this.http
      .get<IAuthResponse>(
        `${environment.api}/user/refresh`,
        { headers: { Authorization: `Bearer ${this.currentUserValue.jwt}` } }
        )
      .pipe(
        tap(
          next => {
            if (next && next.jwt) {
              localStorage.setItem('currentUser', JSON.stringify(next));
              this.currentUserSubject.next(next);
            }
          }
        )
      );
  }

  deleteAccount({password}: {password: string}): Observable<null> {
    return this.http
      .post<{}>(`${environment.api}/user/delete`, {password})
      .pipe(
        tap(
          () => {
            localStorage.removeItem('currentUser');
            this.currentUserSubject.next(null);
            this.toastr.info('Your account has been deleted');
          }
        ),
        map(
          () => null
        )
      );
  }

  downloadArchive(): Observable<any> {
    return this.http
      .get<any>(`${environment.api}/user/export`);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.toastr.info('You have been logged out');
  }
}
