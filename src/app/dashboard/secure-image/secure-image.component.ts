import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { combineLatest, Observable, ReplaySubject } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { ImageService } from '../../services/api/image.service';
import { IImage, ISettings } from '../../models';
import { SettingsService } from '../../services/settings.service';
import { SafeUrl } from '@angular/platform-browser';

/* Major thanks to https://blog.strongbrew.io/safe-image-requests-in-angular/ */

@Component({
  selector: 'app-secure-image',
  templateUrl: './secure-image.component.html',
  styleUrls: ['./secure-image.component.css']
})
export class SecureImageComponent implements OnInit {

  @Input()
  public set image(img: IImage) {
    this.src$.next(img);
  }

  @Input()
  public allowDelete = false;

  @Output()
  public delete = new EventEmitter();

  public settings$: Observable<ISettings> = null;
  public hasTapped = false;

  private src$ = new ReplaySubject<IImage>(1);

  // this stream will contain the actual url that our img tag will load
  // everytime the src changes, the previous call would be canceled and the
  // new resource would be loaded
  public dataUrl$: Observable<SafeUrl> = null;

  constructor(private imageService: ImageService,
              private settingsService: SettingsService) {

  }

  ngOnInit() {
    this.settings$ = this.settingsService.observe();

    this.dataUrl$ = this.src$.asObservable()
      .pipe(
        switchMap(
          image => this.imageService.loadImage(image)
        )
      );
  }
}
