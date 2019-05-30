import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserStats } from '../../models';
import { StatsService } from '../../services/api/stats.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public stats$: Observable<IUserStats> = null;

  constructor(private statsService: StatsService) { }

  ngOnInit() {
    this.stats$ = this.statsService.get();
  }

}
