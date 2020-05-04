import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-translate-detail',
  templateUrl: './translate-detail.component.html',
  styleUrls: ['./translate-detail.component.scss']
})
export class TranslateDetailComponent implements OnInit {
  public translation: Record<string, string> = {};
  public locales: string[] = ['en', 'nl'];

  public translationKey: string;

  constructor(private translateService: TranslateService) { }

  public async ngOnInit(): Promise<void> {
    // Do api call!
    for (const locale of this.locales) {
      const translations = await this.translateService.getTranslation(locale).toPromise();

      console.log(translations[this.translationKey]);
      this.translation[locale] = translations[this.translationKey];
    }
  }

}
