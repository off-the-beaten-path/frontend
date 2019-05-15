import { Component, OnInit } from '@angular/core';
import { CheckInService } from '../../services/api/checkin.service';
import { ICheckIn } from '../../models/checkin.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  public history: ICheckIn[] = [];
  public loading = true;

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
