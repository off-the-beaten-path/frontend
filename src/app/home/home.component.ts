import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IGlobalStats } from '../models';
import { StatsService } from '../services/api/stats.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public stats$: Observable<IGlobalStats> = null;

  constructor(private statsService: StatsService) { }

  ngOnInit() {
    this.stats$ = this.statsService.getGlobal();
  }
}
