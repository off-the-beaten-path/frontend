import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { icon, latLng, Map, Marker, marker, polyline, tileLayer } from 'leaflet';
import { GeolocationService } from '../../services/geolocation.service';
import { ICheckIn } from '../../models/checkin.model';

// Tokyo, baby!
const DEFAULT_LOCATION = latLng(40.6943, -73.9249);
const DEFAULT_ZOOM = 15;
const USER_ZOOM = 10;

export interface IMapConfig {
  checkins: ICheckIn[];
  center: 'user' | 'checkin';
  mode: 'include-checkin' | 'geocache-only';
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {

  @Output()
  public mapReady = new EventEmitter<Map>();

  private mapConfig: IMapConfig = null;

  @Input()
  public set config(config: IMapConfig) {
    if (config) {
      this.mapConfig = config;

      const checkins = config.checkins;

      const center = latLng(checkins[0].geocache.location.lat, checkins[0].geocache.location.lng);

      this.leafletOptions = {
        layers: [
          tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: 'Open Street Map'})
        ],
        zoom: DEFAULT_ZOOM,
        center
      };

      const geocacheMarkerSettings = {
        icon: icon({
          iconSize: [48, 48],
          iconAnchor: [24, 48],
          iconUrl: 'assets/markers/marker.png'
        })
      };

      const checkinMarkerSettings = {
        icon: icon({
          iconSize: [48, 48],
          iconAnchor: [16, 48],
          iconUrl: 'assets/markers/flag.png'
        })
      };

      // always display the geocache markers
      this.leafletLayers = checkins.map(
        c => marker([c.geocache.location.lat, c.geocache.location.lng], geocacheMarkerSettings)
      );

      // include checkin markers and line between checkin/geocache when set
      if (config.mode === 'include-checkin') {
        this.leafletLayers = this.leafletLayers.concat(
          checkins.map(
            c => marker([c.location.lat, c.location.lng], checkinMarkerSettings)
          )
        );

        this.leafletLayers = this.leafletLayers.concat(
          checkins.map(
            c => polyline([[c.location.lat, c.location.lng], [c.geocache.location.lat, c.geocache.location.lng]], {color: 'red'})
          )
        );
      }

      this.leafletLayers.push(
        this.userMarker
      );
    }
  }

  public leafletOptions: any = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: 'Open Street Map'})
    ],
    zoom: DEFAULT_ZOOM,
    center: DEFAULT_LOCATION
  };

  public leafletLayers: any[] = [];
  private userMarker: Marker = null;

  public leafletMap: Map = null;

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
    this.geolocationService
      .getCurrentPosition()
      .subscribe(
        position => {
          this.userMarker.setLatLng([position.lat, position.lng]);

          if (this.mapConfig && this.mapConfig.center === 'user') {
            this.leafletMap.setView([position.lat, position.lng], USER_ZOOM);
          }
        }
      );
  }

  ngOnDestroy(): void {
  }

  onMapReady(m: Map): void {
    this.leafletMap = m;

    this.mapReady.emit(m);
  }
}
