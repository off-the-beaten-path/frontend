import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ICheckIn } from '../../models/checkin.model';
import { CheckInService } from '../../services/api/checkin.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent implements OnInit {

  @ViewChild('myPond') myPond: any;

  public checkin$: Observable<ICheckIn> = null;
  public editing = false;
  public hasDeletedImage = false;

  public updateForm: FormGroup = null;

  public pondOptions: any = null;

  constructor(private checkinService: CheckInService,
              private route: ActivatedRoute,
              private authService: AuthService) {
    this.updateForm = new FormGroup({
      text: new FormControl(''),
      image_id: new FormControl(null),
      checkin_id: new FormControl()
    });

    this.pondOptions = {
      acceptedFileTypes: 'image/jpeg, image/png',
      maxFileSize: '10MB',
      server: {
        url: environment.api,
        process: {
          url: '/image/',
          method: 'POST',
          withCredentials: false,
          headers: {
            Authorization: `Bearer ${authService.currentUserValue.jwt}`
          },
          onload: resp => {
            resp = JSON.parse(resp);

            this.updateForm.patchValue({image_id: resp.id});

            return resp.id;
          }
        },
        load: null,
        fetch: null,
        revert: null,
        restore: null
      }
    };
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
          () => {
            this.exitEditingMode();
          }
        )
      );
  }

  onImageDelete(): void {
    this.updateForm.patchValue({
      image_id: -1
    });

    this.hasDeletedImage = true;
  }

  enterEditingMode() {
    this.editing = true;
    this.hasDeletedImage = false;
  }

  exitEditingMode() {
    this.editing = false;
    this.hasDeletedImage = false;
  }
}
