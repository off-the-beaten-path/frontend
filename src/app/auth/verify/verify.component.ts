import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  public isLoading = true;
  public hasError = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.authService
      .verifyAccount(this.route.snapshot.paramMap.get('token'))
      .subscribe(
        () => {
          this.isLoading = false;
          this.router.navigate(['/', 'dashboard']);
        },
        () => {
          this.isLoading = false;
          this.hasError = true;
        }
      );
  }
}
