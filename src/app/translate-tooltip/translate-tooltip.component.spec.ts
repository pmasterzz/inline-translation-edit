import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateTooltipComponent } from './translate-tooltip.component';

describe('TranslateTooltipComponent', () => {
  let component: TranslateTooltipComponent;
  let fixture: ComponentFixture<TranslateTooltipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslateTooltipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslateTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
