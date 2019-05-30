import { Injectable, OnDestroy } from '@angular/core';

import { BehaviorSubject, Observable, ReplaySubject, Subscription } from 'rxjs';
import { ISettings } from '../models';

const SETTINGS_LOCALSTORAGE_KEY = 'OTBP_SETTINGS';

const DEFAULT_SETTINGS: ISettings = {
  doConstantUpdates: false,
  tapToLoadImages: false
};


@Injectable({
  providedIn: 'root'
})
export class SettingsService implements OnDestroy {

  private settingsSubject: BehaviorSubject<ISettings> = null;
  private subs: Subscription[] = [];

  constructor() {
    const storedValue = localStorage.getItem(SETTINGS_LOCALSTORAGE_KEY);

    if (null !== storedValue) {
      this.settingsSubject = new BehaviorSubject(JSON.parse(storedValue));
    } else {
      this.settingsSubject = new BehaviorSubject(DEFAULT_SETTINGS);
    }

    this.subs.push(
      this.settingsSubject.subscribe(settings => localStorage.setItem(SETTINGS_LOCALSTORAGE_KEY, JSON.stringify(settings)))
    );
  }

  public update(settings: Partial<ISettings>): void {
    this.settingsSubject.next({
      ...this.settingsSubject.value,
      ...settings
    });
  }

  public observe(): Observable<ISettings> {
    return this.settingsSubject.asObservable();
  }

  public currentValue(): ISettings {
    return this.settingsSubject.value;
  }

  public ngOnDestroy(): void {
    for (const sub of this.subs) {
      sub.unsubscribe();
    }
  }
}
