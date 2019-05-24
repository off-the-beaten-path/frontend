import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  public form: FormGroup = null;

  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      password: ['', Validators.required],
      token: [this.route.snapshot.paramMap.get('token'), Validators.required]
    });
  }

  public submit(): void {
    this.authService
      .reset(this.form.value)
      .subscribe(
        () => this.router.navigate(['dashboard'])
      );
  }
}
