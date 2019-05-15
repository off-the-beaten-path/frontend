import { Component, OnInit } from '@angular/core';
import { CheckInService } from '../../services/api/checkin.service';
import { ICheckIn } from '../../models/checkin.model';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  public history: ICheckIn[] = [];
  public loading = true;

  public environment = environment;

  constructor(private checkInService: CheckInService) { }

  ngOnInit() {
    this.checkInService
      .getOwn()
      .subscribe(
        resp => {
          this.history = resp.items;
        }
      );
  }

}
