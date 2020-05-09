import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslateKeyService } from './translate-key.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'inline-translation';

  constructor(private translateService: TranslateService, public translateKeyService: TranslateKeyService) {
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
  }

  public onClick(): void {
    alert('hi');
  }

  public toggleEditMode(): void {
    this.translateKeyService.editMode = !this.translateKeyService.editMode;
  }
}
