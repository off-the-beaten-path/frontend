import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ILatLngPosition, IGeoCache } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class GeoCacheService {

  constructor(private http: HttpClient) {
  }

  public get(): Observable<IGeoCache> {
    return this.http
      .get<any>(`${environment.api}/geocache/active`);
  }

  public create(loc: ILatLngPosition): Observable<IGeoCache> {
    return this.http
      .post<any>(`${environment.api}/geocache`, loc);
  }
}
