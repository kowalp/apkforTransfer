import { AuthService } from './../log-in/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {
  email = new FormControl('email', [Validators.required, Validators.email, Validators.minLength(6)]);
  hide = true;
  isLoginError = false;
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  onSubmit(name, email, password, role): void {
    this.authService.Register(name, email, password, role)
    .subscribe((data: any) => {
      pipe(map(data));
      console.log(data);
    },
    (err: HttpErrorResponse) => {
      this.isLoginError = true;
    });
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }
}
