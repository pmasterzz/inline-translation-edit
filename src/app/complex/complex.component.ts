import { Component, ElementRef, forwardRef, Input, OnInit } from '@angular/core';
import { BaseComponent } from '../base-component';

@Component({
  selector: 'app-complex',
  templateUrl: './complex.component.html',
  styleUrls: ['./complex.component.scss'],
  providers: [{
    provide: BaseComponent, useExisting: forwardRef(() => ComplexComponent)
  }]
})
export class ComplexComponent extends BaseComponent implements OnInit {
  @Input()
  public label: string;
  @Input()
  public pep: string;
  constructor(private hostElement: ElementRef) {
    super(hostElement);
  }

  ngOnInit(): void {
  }

}

