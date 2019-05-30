import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { FilePondModule, registerPlugin } from 'ngx-filepond';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { MainComponent } from './main/main.component';
import { PlayComponent } from './play/play.component';
import { CompassComponent } from './compass/compass.component';
import { HistoryComponent } from './history/history.component';
import { SettingsComponent } from './settings/settings.component';
import { SecureImageComponent } from './secure-image/secure-image.component';
import { CheckinComponent } from './checkin/checkin.component';
import { MapComponent } from './map/map.component';

import { IdenticonHashDirective } from './identicon/identicon-hash.directive';

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation);
registerPlugin(FilePondPluginFileValidateType);
registerPlugin(FilePondPluginImagePreview);


@NgModule({
  declarations: [MainComponent, PlayComponent, CompassComponent, HistoryComponent, SettingsComponent, SecureImageComponent, CheckinComponent, IdenticonHashDirective, MapComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    ToastrModule,
    FilePondModule,
    LeafletModule,
    InfiniteScrollModule
  ]
})
export class DashboardModule { }
