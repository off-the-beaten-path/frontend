import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public form: FormGroup = null;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public register(): void {
    this.authService
      .register(this.form.value)
      .subscribe(
        () => this.router.navigate(['dashboard'])
      );
  }
}
