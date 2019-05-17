import { Component, OnInit } from '@angular/core';
import { CheckInService } from '../../services/api/checkin.service';
import { ICheckIn } from '../../models/checkin.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Map } from 'leaflet';
import { MatTabChangeEvent } from '@angular/material';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  public history$: Observable<ICheckIn[]> = null;

  public leafletMap: Map = null;

  constructor(private checkInService: CheckInService) {
  }

  ngOnInit() {
    this.history$ = this.checkInService.getAll()
      .pipe(
        map(
          resp => resp.items
        )
      );
  }

  onSelectedTabChange(event: MatTabChangeEvent): void {
    // fix the size of the map on tab change
    this.leafletMap.invalidateSize();
  }

  onMapReady(m: Map): void {
    this.leafletMap = m;
  }
}
