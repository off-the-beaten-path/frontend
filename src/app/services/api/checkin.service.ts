import { Injectable } from '@angular/core';
import { ICheckIn } from '../../models/checkin.model';
import { IEasyPagination } from '../../models';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CheckInService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<IEasyPagination<ICheckIn>> {
    return this.http
      .get<IEasyPagination<ICheckIn>>(`${environment.api}/checkin/user/`);
  }

  getOne(id: number): Observable<ICheckIn> {
    return this.http
      .get<ICheckIn>(`${environment.api}/checkin/user/${id}`);
  }
}
