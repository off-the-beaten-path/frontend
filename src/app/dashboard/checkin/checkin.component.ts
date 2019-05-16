import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICheckIn } from '../../models/checkin.model';
import { CheckInService } from '../../services/api/checkin.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent implements OnInit {

  public checkin$: Observable<ICheckIn> = null;

  constructor(private checkinService: CheckInService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.checkin$ = this.route.paramMap
      .pipe(
        switchMap(
          params => {
            return this.checkinService.getOne(+params.get('id'));
          }
        )
      );
  }

}
