import { Injectable } from '@angular/core';

import { Observable, ReplaySubject } from 'rxjs';

const DO_CONSTANT_UPDATE_LOCALSTORAGE_KEY = 'OTBP_SETTINGS_DO_CONSTANT_UPDATE';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private doConstantUpdateEventEmitter = new ReplaySubject<boolean>(1);

  public set doConstantUpdate(value: boolean) {
    this.doConstantUpdateEventEmitter.next(value);

    localStorage.setItem(DO_CONSTANT_UPDATE_LOCALSTORAGE_KEY, JSON.stringify(value));
  }

  public get doConstantUpdateEvents(): Observable<boolean> {
    return this.doConstantUpdateEventEmitter;
  }

  constructor() {
    const storedValue = localStorage.getItem(DO_CONSTANT_UPDATE_LOCALSTORAGE_KEY);
    if (null !== storedValue) {
      this.doConstantUpdateEventEmitter.next(JSON.parse(storedValue));
    } else {
      this.doConstantUpdateEventEmitter.next(false);
    }
  }

}
