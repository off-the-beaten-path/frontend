import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ILatLngPosition } from '../models';

const positionOptions: PositionOptions = {
  enableHighAccuracy: true,
  timeout: Infinity,
  maximumAge: 0
};

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() {}

  getCurrentPosition(): Observable<ILatLngPosition> {
    if ('geolocation' in navigator) {
      return new Observable(
        observable => {
          navigator
            .geolocation
            .getCurrentPosition(
              success => {
                const latestPosition: ILatLngPosition = {
                  lat: success.coords.latitude,
                  lng: success.coords.longitude
                };

                observable.next(latestPosition);
                observable.complete();
              },
              error => {
                if (null !== error) {
                  observable.error(error);
                } else {
                  observable.error('Generic error in getting location.');
                }

                observable.complete();
              },
              positionOptions
            );
        }
      );
    }

    return throwError('getCurrentPosition() unavailable');
  }

  watchPosition(): Observable<ILatLngPosition> {
    if ('geolocation' in navigator) {
      return new Observable(
        observable => {
          const watchId = navigator
            .geolocation
            .watchPosition(
              success => {
                const latestPosition: ILatLngPosition = {
                  lat: success.coords.latitude,
                  lng: success.coords.longitude
                };

                observable.next(latestPosition);
              },
              error => {
                if (null !== error) {
                  observable.error(error);
                } else {
                  observable.error('Generic error in getting location.');
                }

                observable.complete();
              },
              positionOptions
            );

          return () => navigator.geolocation.clearWatch(watchId);
        }
      );
    }

    return throwError('watchPosition() unavailable');
  }
}
