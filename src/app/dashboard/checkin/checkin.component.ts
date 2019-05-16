import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICheckIn } from '../../models/checkin.model';
import { CheckInService } from '../../services/api/checkin.service';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, tap } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent implements OnInit {

  public checkin$: Observable<ICheckIn> = null;
  public editing = false;

  public updateForm: FormGroup = null;

  constructor(private checkinService: CheckInService,
              private route: ActivatedRoute) {
    this.updateForm = new FormGroup({
      text: new FormControl(),
      image_id: new FormControl(),
      checkin_id: new FormControl()
    });
  }

  ngOnInit() {
    this.checkin$ = this.route.paramMap
      .pipe(
        switchMap(
          params => {
            return this.checkinService.getOne(+params.get('id'));
          }
        ),
        tap(
          checkin => {
            this.updateForm.setValue({
              text: checkin.text,
              image_id: checkin.image && checkin.image.id,
              checkin_id: checkin.id
            });
          }
        )
      );
  }

  updateCheckin(): void {
    this.checkin$ = this.checkinService
      .update(this.updateForm.value)
      .pipe(
        tap(
          () => this.editing = false
        )
      );
  }
}
