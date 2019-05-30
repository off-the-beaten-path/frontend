import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IGlobalStats, IUserStats } from '../../models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private http: HttpClient) {
  }

  public get(): Observable<IUserStats> {
    return this.http
      .get<IUserStats>(`${environment.api}/stats/`);
  }

  public getGlobal(): Observable<IGlobalStats> {
    return this.http
      .get<IGlobalStats>(`${environment.api}/stats/global/`);
  }
}
