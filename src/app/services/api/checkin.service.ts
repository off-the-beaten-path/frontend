import { Injectable } from '@angular/core';
import { ICheckIn } from '../../models/checkin.model';
import { IEasyPagination, IGeoCache, ILatLngPosition } from '../../models';
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
      .get<ICheckIn>(`${environment.api}/checkin/${id}`);
  }

  create(geocache: IGeoCache, finalLocation: ILatLngPosition): Observable<ICheckIn> {
    const data = {
      geocache_id: geocache.id,
      location: finalLocation
    };

    return this.http
      .post<ICheckIn>(`${environment.api}/checkin`, data);
  }

  update({checkin_id, image_id, text}: {checkin_id: number, image_id: number, text: string}): Observable<ICheckIn> {
    const data = {
      text,
      image_id
    };

    return this.http
      .put<ICheckIn>(`${environment.api}/checkin/${checkin_id}`, data);
  }
}
