import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { ISettings } from '../../models';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  public settings$: Observable<ISettings> = null;

  public changePasswordForm: FormGroup = null;
  public deleteAccountForm: FormGroup = null;

  constructor(private settingsService: SettingsService,
              private authService: AuthService,
              private router: Router) {
    this.deleteAccountForm = new FormGroup({
      password: new FormControl('', Validators.required)
    });

    this.changePasswordForm = new FormGroup({
      oldPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.settings$ = this.settingsService.observe();
  }

  updateSettings(key: string, value: any): void {
    this.settingsService.update({
      [key]: value
    });
  }

  onDeleteAccount(): void {
    this.authService
      .deleteAccount(this.deleteAccountForm.value)
      .subscribe(
        () => this.router.navigate(['/'])
      );
  }

  onChangePassword(): void {
    const {oldPassword, newPassword} = this.changePasswordForm.value;
    this.authService
      .changePassword({old: oldPassword, pass: newPassword})
      .subscribe();
  }

  onDownloadArchive(): void {
    this.authService
      .downloadArchive()
      .subscribe(
        res => {
          const blob = new Blob([res], {type: 'application/zip'});
          saveAs(blob, 'archive.zip');
        }
      );
  }
}
