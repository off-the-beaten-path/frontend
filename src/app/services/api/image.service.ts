import { Injectable } from '@angular/core';
import {IImage} from '../../models';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private httpClient: HttpClient,
              private domSanitizer: DomSanitizer) {
  }

  loadImage(image: IImage): Observable<SafeUrl> {
    return this.httpClient
    // load the image as a blob
      .get(`${environment.api}/image/${image.filename}`, {responseType: 'blob'})
      // create an object url of that blob that we can use in the src attribute
      .pipe(
        map(
          e => this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(e))
        )
      );
  }
}
