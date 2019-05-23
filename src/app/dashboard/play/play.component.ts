import { Component, OnInit, OnDestroy } from '@angular/core';

import { GeolocationService } from '../../services/geolocation.service';
import { GeoCacheService } from '../../services/api/geocache.service';
import { SettingsService } from '../../services/settings.service';

import { Directions, IGeoCache, ILatLngPosition } from '../../models';

import { Subscription, of, zip } from 'rxjs';
import { CheckInService } from '../../services/api/checkin.service';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit, OnDestroy {

  public state: 'loading' | 'has-active' | 'does-not-have-active' | 'error' = 'loading';

  public error: any = null;

  public directions: Directions = null;
  public target: IGeoCache = null;

  public closeEnough = false;

  private automaticUpdateSubscription: null | Subscription = null;
  private doAutomaticUpdateSubscription: null | Subscription = null;

  constructor(private locationService: GeolocationService,
              private geoCacheService: GeoCacheService,
              private settings: SettingsService,
              private checkinService: CheckInService,
              private router: Router) {
  }

  public ngOnInit() {
    zip(
      this.geoCacheService.get(),
      this.locationService.getCurrentPosition()
    )
      .subscribe(
        ([target, position]: [IGeoCache, ILatLngPosition]) => {
          this.target = target;

          this.updateDirections(position);

          this.automaticUpdate();

          this.state = 'has-active';
        },
        resp => {
          if (resp && resp.error && resp.error.message === 'No active geocache') {
            this.state = 'does-not-have-active';
          } else {
            this.state = 'error';

            this.error = 'Unknown Error!';

            if (resp.error && resp.error.message) {
              // Backend 400-level error
              this.error = resp.error.message;
            } else if (resp.statusText) {
              // Other kind of error (500, API offline, etc.)
              this.error = resp.statusText;
            }
          }
        }
      );
  }

  public createGeocache(): void {
    this.locationService
      .getCurrentPosition()
      .pipe(
        switchMap(
          location => zip(
            this.geoCacheService.create(location),
            of(location)
          )
        )
      )
      .subscribe(
        ([target, position]: [IGeoCache, ILatLngPosition]) => {
          this.target = target;

          this.updateDirections(position);

          this.automaticUpdate();

          this.state = 'has-active';
        }
      );
  }

  public doCheckIn(): void {
    this.checkinService
      .create(this.target, this.directions.start)
      .subscribe(
        checkin => this.router.navigate(['/', 'dashboard', 'checkin', checkin.id])
      );
  }

  public updateDirections(updatedPosition: ILatLngPosition): void {
    this.directions = new Directions(
      updatedPosition,
      this.target.location
    );

    if (this.directions.distance < 50) {
      console.log('DirectionsComponent', 'Within reach!');

      if (false === this.closeEnough) {
        this.closeEnough = true;
      }
    } else {
      this.closeEnough = false;
    }
  }

  public ngOnDestroy() {
    if (null !== this.automaticUpdateSubscription) {
      this.automaticUpdateSubscription.unsubscribe();
      this.locationService.stopWatching();
    }

    if (null !== this.doAutomaticUpdateSubscription) {
      this.doAutomaticUpdateSubscription.unsubscribe();
    }
  }

  public onManualUpdate() {
    this.locationService
      .getCurrentPosition()
      .subscribe(
        value => this.updateDirections(value),
        error => {
          console.log('DirectionsComponent', error);
        }
      );
  }

  public automaticUpdate() {
    this.doAutomaticUpdateSubscription = this.settings
      .doConstantUpdateEvents
      .subscribe(
        value => {
          if (value) {
            if (null !== this.automaticUpdateSubscription) {
              this.automaticUpdateSubscription.unsubscribe();
              this.locationService.stopWatching();
            }

            this.automaticUpdateSubscription = this.locationService
              .watchPosition()
              .subscribe(
                position => this.updateDirections(position)
              );
          } else {
            if (null !== this.automaticUpdateSubscription) {
              this.automaticUpdateSubscription.unsubscribe();
              this.automaticUpdateSubscription = null;
              this.locationService.stopWatching();
            }
          }
        }
      );
  }
}
