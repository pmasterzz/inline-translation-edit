import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TranslateDirective } from './translate.directive';
import { TranslateLoader, TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { OverlayModule } from '@angular/cdk/overlay';
import { TranslateTooltipComponent } from './translate-tooltip/translate-tooltip.component';
import { FormsModule } from '@angular/forms';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { TranslateDetailComponent } from './translate-detail/translate-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComplexComponent } from './complex/complex.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  entryComponents: [TranslateDetailComponent, TranslateTooltipComponent],
  declarations: [
    AppComponent,
    TranslateDirective,
    TranslateTooltipComponent,
    TranslateDetailComponent,
    ComplexComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    OverlayModule,
    FormsModule,
    DynamicDialogModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    HttpClientModule
  ],
  providers: [TranslatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
