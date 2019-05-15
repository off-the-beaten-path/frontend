import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { PlayComponent } from './play/play.component';
import { CompassComponent } from './compass/compass.component';
import { HistoryComponent } from './history/history.component';
import { SettingsComponent } from './settings/settings.component';
import { SecureImageComponent } from './secure-image/secure-image.component';

@NgModule({
  declarations: [MainComponent, PlayComponent, CompassComponent, HistoryComponent, SettingsComponent, SecureImageComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    ToastrModule
  ]
})
export class DashboardModule { }
