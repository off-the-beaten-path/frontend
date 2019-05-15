import { Component, OnDestroy, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy {
  public doConstantUpdates: null | boolean = null;

  private doConstantUpdateSubscription: null | Subscription = null;

  constructor(private settings: SettingsService) {
  }

  ngOnInit() {
    this.doConstantUpdateSubscription = this.settings
      .doConstantUpdateEvents
      .subscribe(
        value => {
          this.doConstantUpdates = value;
        }
      );
  }

  ngOnDestroy() {
    if (null !== this.doConstantUpdateSubscription) {
      this.doConstantUpdateSubscription.unsubscribe();
    }
  }

  public toggleDoConstantUpdates() {
    this.settings.doConstantUpdate = !this.doConstantUpdates;
  }

}
