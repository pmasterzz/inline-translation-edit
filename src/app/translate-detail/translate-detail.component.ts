import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-translate-detail',
  templateUrl: './translate-detail.component.html',
  styleUrls: ['./translate-detail.component.scss']
})
export class TranslateDetailComponent implements OnInit {
  public translation: Record<string, string> = {};
  public locales: string[] = ['en', 'nl'];
  public translationKey: string;

  constructor(private translateService: TranslateService, public config: DynamicDialogConfig) {
  }

  public async ngOnInit(): Promise<void> {
    for (const locale of this.locales) {
      const translations = await this.translateService.getTranslation(locale).toPromise();
      let translation = translations[this.config.data.translationKey];

      if (!translation) {
        const splitKey = this.config.data.translationKey.split('.');
        translation = translations[splitKey[0]];

        splitKey.shift();
        for (const part of splitKey) {
          translation = translation[part];
        }
      }

      this.translation[locale] = translation;
    }
  }

  public save(): void {
    this.translateService.set(this.config.data.translationKey, this.translation.en, 'en');
    setTimeout(() => {
      this.translateService.getTranslation('en').subscribe((res) => {
      });
    }, 1000);
  }

}
