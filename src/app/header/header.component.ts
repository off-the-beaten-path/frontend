import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../models';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output()
  public toggleSidenav = new EventEmitter();
  public user$: Observable<IUser>;

  constructor(private authService: AuthService) {
    this.user$ = this.authService.currentUser;
  }

  ngOnInit() {
  }

}
