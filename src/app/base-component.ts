import { ElementRef } from '@angular/core';

export class BaseComponent {
  constructor(private baseHost: ElementRef) {
    baseHost.nativeElement.__component = this;
  }
}
