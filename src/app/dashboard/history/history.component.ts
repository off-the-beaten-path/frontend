import { Component, OnInit } from '@angular/core';
import { CheckInService } from '../../services/api/checkin.service';
import { ICheckIn } from '../../models/checkin.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  public history$: Observable<ICheckIn[]> = null;

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
        )
      );
  }

}
