import { ChangeDetectorRef, ComponentRef, Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { TranslateKeyService } from './translate-key.service';
import { TranslateService } from '@ngx-translate/core';
import { filter, first } from 'rxjs/operators';
import { Overlay, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { TranslateTooltipComponent } from './translate-tooltip/translate-tooltip.component';
import { DialogService } from 'primeng/dynamicdialog';

@Directive({
  selector: '[appTranslate]',
  providers: [DialogService]
})
export class TranslateDirective implements OnInit {
  @Input()
  public set appTranslate(key: string) {
    this.translationKey = key;
    this.setTranslation();
  }

  private overlayRef: OverlayRef;
  public translationKey: string;

  @HostListener('mouseenter', ['$event'])
  public onElementClick(event) {
    event.preventDefault();
    event.stopPropagation();

    if (!this.overlayRef.hasAttached()) {
      const tooltipPortal = new ComponentPortal(TranslateTooltipComponent);
      const tooltipRef: ComponentRef<TranslateTooltipComponent> = this.overlayRef.attach(tooltipPortal);
      tooltipRef.instance.key = this.translationKey;
      tooltipRef.instance.onMouseOut.subscribe( () => {
        console.log('OUT');
        this.overlayRef.detach();
      });
    }

    return false;
  }

  @HostListener('mouseout', ['$event'])
  hide(target) {
    if (target.toElement.className !== 'my-tooltip' && target.toElement.parentNode.className !== 'my-tooltip') {
      this.overlayRef.detach();
    }
  }

  constructor(private element: ElementRef,
              private overlay: Overlay,
              private cdr: ChangeDetectorRef,
              private overlayPositionBuilder: OverlayPositionBuilder,
              private translateService: TranslateKeyService,
              private dialogService: DialogService,
              private ngxTranslateService: TranslateService) {
  }

  public ngOnInit(): void {
    const positionStrategy = this.overlayPositionBuilder
      // Create position attached to the elementRef
      .flexibleConnectedTo(this.element)
      // Describe how to connect overlay to the elementRef
      // Means, attach overlay's center bottom point to the
      // top center point of the elementRef.
      .withPositions([{
        originX: 'start',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom'
      }]);
    this.overlayRef = this.overlay.create({ positionStrategy });

  }

  public setTranslation(): void {
    this.ngxTranslateService.get(this.translationKey).pipe(filter((translation) => !!translation), first()).subscribe((translation) => {
      this.updateValue(translation);
    });
  }

  public updateValue(translation): void {
    this.element.nativeElement.textContent = translation;
  }

}
