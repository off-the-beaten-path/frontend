import { Component, OnInit } from '@angular/core';
import { CheckInService } from '../../services/api/checkin.service';
import { ICheckIn } from '../../models/checkin.model';
import { Observable, zip } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { latLng, tileLayer, marker, icon, Map } from 'leaflet';
import { MatTabChangeEvent } from '@angular/material';
import { GeolocationService } from '../../services/geolocation.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  public history$: Observable<ICheckIn[]> = null;

  public leafletOptions: any = null;
  public leafletLayers: any[] = null;
  public leafletMap: Map = null;

  constructor(private checkInService: CheckInService,
              private geolocationService: GeolocationService) {
  }

  ngOnInit() {
    this.history$ = zip(this.checkInService.getAll(), this.geolocationService.getCurrentPosition())
      .pipe(
        tap(
          ([resp, position]) => {
            const checkins = resp.items;

            this.leafletOptions = {
              layers: [
                tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: 'Open Street Map'})
              ],
              zoom: 8,
              center: latLng(position.lat, position.lng)
            };

            this.leafletLayers = checkins.map(
              c => marker([c.geocache.location.lat, c.geocache.location.lng], {
                icon: icon({
                  iconSize: [25, 41],
                  iconAnchor: [13, 41],
                  iconUrl: 'assets/marker-icon.png',
                  shadowUrl: 'assets/marker-shadow.png'
                })
              })
            );
          }
        ),
        map(
          ([resp, _]) => resp.items
        )
      );
  }

  onSelectedTabChange(event: MatTabChangeEvent): void {
    this.leafletMap.invalidateSize();
  }

  onMapReady(m: Map): void {
    this.leafletMap = m;
  }
}
