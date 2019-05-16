import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { PlayComponent } from './play/play.component';
import { HistoryComponent } from './history/history.component';
import { SettingsComponent } from './settings/settings.component';
import { CheckinComponent } from './checkin/checkin.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'play',
    component: PlayComponent
  },
  {
    path: 'history',
    component: HistoryComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: 'checkin/:id',
    component: CheckinComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
