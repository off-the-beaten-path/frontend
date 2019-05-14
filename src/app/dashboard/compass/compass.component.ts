import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-compass',
  templateUrl: './compass.component.html',
  styleUrls: ['./compass.component.css']
})
export class CompassComponent implements OnInit {

  @Input()
  public set rotation(degrees: number) {
    this.safeTransform = this.sanitizer.bypassSecurityTrustStyle(
      `rotate(${degrees}deg)`
    );
  }

  public safeTransform: SafeStyle;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

}
