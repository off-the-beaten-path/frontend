import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IUser } from '../models';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  @Output()
  public toggleSidenav = new EventEmitter();
  public user$: Observable<IUser>;

  constructor(private authService: AuthService) {
    this.user$ = this.authService.currentUser;
  }

  ngOnInit() {
  }

  public logout() {
    this.authService.logout();
  }
}
