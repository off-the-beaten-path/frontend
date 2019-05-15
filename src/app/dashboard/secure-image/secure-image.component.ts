import {Component, Input} from '@angular/core';
import {Subject} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {ImageService} from '../../services/api/image.service';
import {IImage} from '../../models';

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

  private src$ = new Subject<IImage>();

  // this stream will contain the actual url that our img tag will load
  // everytime the src changes, the previous call would be canceled and the
  // new resource would be loaded
  dataUrl$ = this.src$
    .pipe(
      switchMap(img => this.imageService.loadImage(img))
    );

  // we need HttpClient to load the image
  constructor(private imageService: ImageService) {
  }

}
