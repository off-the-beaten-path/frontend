import { Component, OnInit } from '@angular/core';
import { CheckInService } from '../../services/api/checkin.service';
import { ICheckIn } from '../../models/checkin.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { latLng, tileLayer, marker, icon, Map } from 'leaflet';
import { MatTabChangeEvent } from '@angular/material';

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

  constructor(private checkInService: CheckInService) {
  }

  ngOnInit() {
    this.history$ = this.checkInService
      .getAll()
      .pipe(
        map(
          resp => {
            return resp.items;
          }
        ),
        tap(
          checkins => {
            const [checkin, ..._] = checkins;

            this.leafletOptions = {
              layers: [
                tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: 'Open Street Map'})
              ],
              zoom: 5,
              center: latLng(checkin.location.lat, checkin.location.lng)
            };

            this.leafletLayers = checkins.map(
              c => marker([c.location.lat, c.location.lng], {
                icon: icon({
                  iconSize: [25, 41],
                  iconAnchor: [13, 41],
                  iconUrl: 'assets/marker-icon.png',
                  shadowUrl: 'assets/marker-shadow.png'
                })
              })
            );
          }
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
