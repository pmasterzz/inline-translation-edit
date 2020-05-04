import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateDetailComponent } from './translate-detail.component';

describe('TranslateDetailComponent', () => {
  let component: TranslateDetailComponent;
  let fixture: ComponentFixture<TranslateDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslateDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslateDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
