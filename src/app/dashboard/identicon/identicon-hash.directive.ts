import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import jdenticon from 'jdenticon';

/* thanks to https://github.com/dmester/jdenticon/issues/23 */

@Directive({selector: '[identiconHash]'})
export class IdenticonHashDirective implements OnChanges {
  @Input() identiconHash: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnChanges(changes: SimpleChanges) {
    jdenticon.update(this.el.nativeElement, this.identiconHash);
  }
}
