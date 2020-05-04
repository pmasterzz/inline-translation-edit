import { TestBed } from '@angular/core/testing';

import { TranslateKeyService } from './translate-key.service';

describe('TranslateService', () => {
  let service: TranslateKeyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslateKeyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
