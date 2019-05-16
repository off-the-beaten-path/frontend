import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { ImageService } from '../../services/api/image.service';
import { IImage } from '../../models';

/* Major thanks to https://blog.strongbrew.io/safe-image-requests-in-angular/ */

@Component({
  selector: 'app-secure-image',
  templateUrl: './secure-image.component.html',
  styleUrls: ['./secure-image.component.css']
})
export class SecureImageComponent {

  @Input()
  public set image(img: IImage) {
    this.src$.next(img);
  }

  @Input()
  public allowDelete = false;

  @Output()
  public delete = new EventEmitter();

  private src$ = new BehaviorSubject<IImage>(null);

  // this stream will contain the actual url that our img tag will load
  // everytime the src changes, the previous call would be canceled and the
  // new resource would be loaded
  public dataUrl$: Observable<any> = this.src$
    .asObservable()
    .pipe(
      filter(img => !!img),
      switchMap(img => {
          return this.imageService.loadImage(img);
        }
      )
    );

  constructor(private imageService: ImageService) {}

}
