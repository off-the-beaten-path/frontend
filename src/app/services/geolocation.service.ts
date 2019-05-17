import { Injectable } from '@angular/core';
import { Observable, Subject, ReplaySubject, throwError } from 'rxjs';
import { ILatLngPosition } from '../models';
import { take } from 'rxjs/operators';

const positionOptions: PositionOptions = {
  enableHighAccuracy: true,
  timeout: Infinity,
  maximumAge: 0
};

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  private lastKnownPosition: null | ILatLngPosition = null;
  private subject: null | ReplaySubject<ILatLngPosition> = null;
  private watchId: null | number = null;

  constructor() {
  }

  getCurrentPosition(): Observable<ILatLngPosition> {
    if (null !== this.subject) {
      return this.subject.pipe(take(1));
    } else if ('geolocation' in navigator) {
      const subject = new Subject<ILatLngPosition>();

      navigator
        .geolocation
        .getCurrentPosition(
          success => {
            const latestPosition: ILatLngPosition = {
              lat: success.coords.latitude,
              lng: success.coords.longitude
            };

            subject.next(latestPosition);
            this.lastKnownPosition = latestPosition;
          },
          error => {
            if (null !== error) {
              subject.error(error);
            } else {
              subject.error('Generic error in getting location.');
            }
          },
          positionOptions
        );

      return subject.pipe(take(1));
    }

    return throwError('getCurrentPosition() unavailable');
  }

  watchPosition(): Observable<ILatLngPosition> {
    if (null !== this.subject) {
      return this.subject.asObservable();
    } else if ('geolocation' in navigator) {
      this.subject = new ReplaySubject<ILatLngPosition>(1);

      this.watchId = navigator
        .geolocation
        .watchPosition(
          success => {
            const latestPosition: ILatLngPosition = {
              lat: success.coords.latitude,
              lng: success.coords.longitude
            };

            this.subject.next(latestPosition);
            this.lastKnownPosition = latestPosition;
          },
          error => {
            if (null !== error) {
              this.subject.error(error);
            } else {
              this.subject.error('Generic error in getting location.');
            }
          },
          positionOptions
        );

      return this.subject.asObservable();
    }

    return throwError('watchPosition() unavailable');
  }

  stopWatching(): void {
    if (null !== this.watchId) {
      navigator.geolocation.clearWatch(this.watchId);
    }

    if (null !== this.subject) {
      this.subject.complete();
      this.subject = null;
    }
  }
}
