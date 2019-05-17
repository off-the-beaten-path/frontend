import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { icon, latLng, Map, Marker, marker, tileLayer } from 'leaflet';
import { GeolocationService } from '../../services/geolocation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {

  @Output()
  public mapReady = new EventEmitter<Map>();

  @Input()
  public set options(options: any) {
    if (null !== options) {
      this.leafletOptions = {
        ...options
      };
    }
  }

  public leafletOptions: any = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: 'Open Street Map'})
    ],
    zoom: 14,
    center: latLng(40.6943, -73.9249)
  };

  @Input()
  public set layers(layers: any[]) {
    if (null !== layers) {
      this.leafletLayers = [
        ...layers
      ];
    }
  }

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
