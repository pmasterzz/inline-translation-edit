import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslateKeyService {
  public editMode = true;
  private currentTranslation = new Subject<string>();

  constructor() {
  }

  public getCurrentTranslation(): Observable<string> {
    return this.currentTranslation.asObservable();
  }

  public setCurrentTranslation(key: string): void {
    this.currentTranslation.next(key);
  }
}
