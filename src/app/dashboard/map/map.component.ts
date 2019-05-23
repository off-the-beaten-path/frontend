import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { icon, latLng, Map, Marker, marker, tileLayer } from 'leaflet';
import { GeolocationService } from '../../services/geolocation.service';
import { Subscription } from 'rxjs';
import { ICheckIn } from '../../models/checkin.model';

// Tokyo, baby!
const DEFAULT_LOCATION = latLng(40.6943, -73.9249);
const DEFAULT_ZOOM = 15;
const USER_ZOOM = 10;

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
    const center = latLng(checkins[0].geocache.location.lat, checkins[0].geocache.location.lng);

    this.leafletOptions = {
      layers: [
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: 'Open Street Map'})
      ],
      zoom: DEFAULT_ZOOM,
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

    this.leafletLayers.push(
      this.userMarker
    );
  }

  public leafletOptions: any = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: 'Open Street Map'})
    ],
    zoom: 14,
    center: latLng(40.6943, -73.9249)
  };

  public leafletLayers: any[] = [];
  private userMarker: Marker = null;

  public leafletMap: Map = null;

  private subscriptions: Subscription[] = [];

  constructor(private geolocationService: GeolocationService) {
    this.userMarker = marker([DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lng], {
      icon: icon({
        iconSize: [44, 64],
        iconAnchor: [34, 54],
        iconUrl: 'assets/user-sprite.png'
      })
    });
  }

  ngOnInit() {
    this.subscriptions.push(
      this.geolocationService
        .getCurrentPosition()
        .subscribe(
          position => {
            this.userMarker.setLatLng([position.lat, position.lng]);

            if (this.center === 'user') {
              this.leafletMap.setView([position.lat, position.lng], USER_ZOOM);
            }
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
