import { TranslateDefaultParser } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { TranslateKeyService } from './translate-key.service';

@Injectable()
class CompleteTranslateParser extends TranslateDefaultParser {

constructor(private translateKeyService: TranslateKeyService) {
  super();
}
  getValue(target: any, key: string): any {
    return super.getValue(target, key);
  }
}
