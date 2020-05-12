import {
  ChangeDetectorRef,
  ComponentRef,
  Directive,
  ElementRef,
  Host,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  ViewContainerRef
} from '@angular/core';
import { TranslateKeyService } from './translate-key.service';
import { TranslateService } from '@ngx-translate/core';
import { filter, takeUntil } from 'rxjs/operators';
import { Overlay, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { TranslateTooltipComponent } from './translate-tooltip/translate-tooltip.component';
import { BaseComponent } from './base-component';
import { Subject } from 'rxjs';

@Directive({
  selector: '[appTranslate]'
})
export class TranslateDirective implements OnInit, OnDestroy {
  @Input()
  public set appTranslate(key: string | Record<string, string>) {
    if (typeof key === 'string') {
      this.translationKeys = [key];
      this.setTranslation(key);
    } else {
      for (const attribute in key) {
        if (key.hasOwnProperty(attribute)) {
          this.translationKeys = [...this.translationKeys, key[attribute]];
          this.setAttributeTranslation(attribute, key[attribute]);
        }
      }
    }
  }

  public translationKey: string;
  public translationKeys: string[] = [];
  private overlayRef: OverlayRef;
  private destroy$ = new Subject<void>();

  public ngOnDestroy(): void {
    this.destroy$.next();
  }

  @HostListener('mouseover', ['$event'])
  public onElementClick(event) {
    if (this.translateService.editMode) {
      event.preventDefault();
      event.stopPropagation();

      if (!this.overlayRef.hasAttached()) {
        const tooltipPortal = new ComponentPortal(TranslateTooltipComponent);
        const tooltipRef: ComponentRef<TranslateTooltipComponent> = this.overlayRef.attach(tooltipPortal);

        tooltipRef.instance.keys = this.translationKeys;
        tooltipRef.instance.onMouseOut.subscribe(() => {
          this.overlayRef.detach();
        });
      }
    }

    return false;
  }

  @HostListener('mouseout', ['$event'])
  hide(target) {
    if (this.translateService.editMode) {
      if (!target.toElement || target.toElement.className !== 'my-tooltip' && target.toElement.parentNode.className !== 'my-tooltip') {
        this.overlayRef.detach();
      }
    }
  }

  constructor(private element: ElementRef,
              private overlay: Overlay,
              private cdr: ChangeDetectorRef,
              private overlayPositionBuilder: OverlayPositionBuilder,
              private translateService: TranslateKeyService,
              private view: ViewContainerRef,
              @Optional() @Host() private baseComponent: BaseComponent,
              private ngxTranslateService: TranslateService) {
  }

  public ngOnInit(): void {
    const positionStrategy = this.overlayPositionBuilder
      .flexibleConnectedTo(this.element)
      .withPositions([{
        originX: 'start',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom'
      }]);
    this.overlayRef = this.overlay.create({ positionStrategy });
  }

  public setTranslation(translationKey: string): void {
    this.ngxTranslateService.stream(translationKey).pipe(
      filter((translation) => !!translation),
      takeUntil(this.destroy$))
      .subscribe((translation) => {
        this.updateValue(translation);
      });
  }

  public updateValue(translation): void {
    this.element.nativeElement.textContent = translation;
  }

  public setAttributeTranslation(attribute: string, translationKey: string): void {
    this.ngxTranslateService.stream(translationKey).pipe(
      filter((translation) => !!translation),
      takeUntil(this.destroy$))
      .subscribe((translation) => {
        this.baseComponent[attribute] = translation;
      });
  }

}
