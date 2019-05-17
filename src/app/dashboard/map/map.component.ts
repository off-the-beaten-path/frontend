import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { icon, LatLng, latLng, Map, Marker, marker, tileLayer } from 'leaflet';
import { GeolocationService } from '../../services/geolocation.service';
import { Subscription } from 'rxjs';
import { ICheckIn } from '../../models/checkin.model';
import { ILatLngPosition } from '../../models';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {

  @Output()
  public mapReady = new EventEmitter<Map>();

  @Input()
  public center: 'user' | 'checkin' = 'user';

  @Input()
  public set checkins(checkins: ICheckIn[]) {
    let center: LatLng;

    if (this.center === 'user' && this.userLocation !== null) {
      center = latLng(this.userLocation.lat, this.userLocation.lng);
    } else if (checkins.length > 0) {
      center = latLng(checkins[0].geocache.location.lat, checkins[0].geocache.location.lng);
    } else {
      // Tokyo, baby!
      center = latLng(40.6943, -73.9249);
    }

    this.leafletOptions = {
      layers: [
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: 'Open Street Map'})
      ],
      zoom: 8,
      center
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

  public leafletOptions: any = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: 'Open Street Map'})
    ],
    zoom: 14,
    center: latLng(40.6943, -73.9249)
  };

  private userLocation: ILatLngPosition = null;

  public leafletLayers: any[] = [];
  private userMarker: Marker = null;

  public leafletMap: Map = null;

  private subscriptions: Subscription[] = [];

  constructor(private geolocationService: GeolocationService) {
  }

  ngOnInit() {
    this.subscriptions.push(
      this.geolocationService
        .watchPosition()
        .subscribe(
          position => {
            if (null === this.userMarker) {
              this.userMarker = marker([position.lat, position.lng], {
                icon: icon({
                  iconSize: [44, 64],
                  iconAnchor: [34, 54],
                  iconUrl: 'assets/user-sprite.png'
                })
              });

              this.leafletLayers.push(
                this.userMarker
              );
            } else {
              this.userMarker.setLatLng([position.lat, position.lng]);
            }

            this.userLocation = position;
          }
        )
    );
  }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  onMapReady(m: Map): void {
    this.leafletMap = m;

    this.mapReady.emit(m);
  }
}
