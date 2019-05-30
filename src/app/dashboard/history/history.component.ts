import { Component, OnInit } from '@angular/core';
import { CheckInService } from '../../services/api/checkin.service';
import { ICheckIn } from '../../models/checkin.model';
import { Map } from 'leaflet';
import { MatTabChangeEvent } from '@angular/material';

const INITIAL_LIST_SIZE = 5;
const LIST_GROWTH = 5;

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  public allCheckins: ICheckIn[] = null;

  private pagedCheckinsCache: ICheckIn[] = null;
  public pagedCheckins: ICheckIn[] = null;

  private leafletMap: Map = null;

  constructor(private checkInService: CheckInService) {
  }

  ngOnInit() {
    this.checkInService
      .getAll()
      .subscribe(
        resp => {
          // Make another copy of the array because we will be splicing the cached array
          this.allCheckins = [
            ...resp.items
          ];

          this.pagedCheckinsCache = [
            ...resp.items
          ];

          this.pagedCheckins = this.pagedCheckinsCache.splice(0, INITIAL_LIST_SIZE);
        }
      );
  }

  onSelectedTabChange(event: MatTabChangeEvent): void {
    // fix the size of the map on tab change
    this.leafletMap.invalidateSize();
  }

  onMapReady(m: Map): void {
    this.leafletMap = m;
  }

  onScroll() {
    this.pagedCheckins = this.pagedCheckins.concat(
      this.pagedCheckinsCache.splice(0, LIST_GROWTH)
    );
  }
}
