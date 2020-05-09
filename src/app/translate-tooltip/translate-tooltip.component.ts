import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { TranslateKeyService } from '../translate-key.service';
import { DialogService } from 'primeng/dynamicdialog';
import { TranslateDetailComponent } from '../translate-detail/translate-detail.component';

@Component({
  selector: 'app-translate-tooltip',
  templateUrl: './translate-tooltip.component.html',
  styleUrls: ['./translate-tooltip.component.scss'],
  providers: [DialogService]
})
export class TranslateTooltipComponent implements OnInit {
  @Input()
  public keys: string[];

  @Output()
  public onMouseOut = new EventEmitter();

  constructor(
    private translateKeyService: TranslateKeyService,
    private dialogService: DialogService) {
  }

  @HostListener('mouseleave', ['$event'])
  public onMouseOutEvent(event) {
    this.onMouseOut.emit();
  }

  ngOnInit(): void {
  }

  public editKey(key: string): void {
    const ref = this.dialogService.open(TranslateDetailComponent, {
      header: key,
      width: '70%',
      data: {
        translationKey: key
      }
    });

    this.translateKeyService.setCurrentTranslation(key);
  }

}
