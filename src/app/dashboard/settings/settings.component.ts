import { Component, OnDestroy, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy {
  public doConstantUpdates: null | boolean = null;

  private doConstantUpdateSubscription: null | Subscription = null;

  public changePasswordForm: FormGroup = null;
  public deleteAccountForm: FormGroup = null;

  constructor(private settings: SettingsService,
              private authService: AuthService) {
    this.deleteAccountForm = new FormGroup({
      password: new FormControl('', Validators.required)
    });

    this.changePasswordForm = new FormGroup({
      oldPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required)
    })
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

  toggleDoConstantUpdates() {
    this.settings.doConstantUpdate = !this.doConstantUpdates;
  }

  onDeleteAccount(): void {

  }

  onChangePassword(): void {
    const {oldPassword, newPassword} = this.changePasswordForm.value;
    this.authService
      .changePassword({old: oldPassword, pass: newPassword})
      .subscribe();
  }
}
