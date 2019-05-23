import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  public form: FormGroup = null;

  public hasSubmitted = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required],
    });
  }

  public submit(): void {
    this.authService
      .forgot(this.form.value.email)
      .subscribe(
        () => {
          this.hasSubmitted = true;
        }
      );
  }
}
