import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastService } from '../shared/toast-notification.service';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  onSubmit(form: NgForm) {
    const firstName = form.value.firstName;
    const lastName = form.value.lastName;
    const email = form.value.email;
    const password = form.value.password;
    let authObs: Observable<AuthResponseData>;
    localStorage.setItem('userName', JSON.stringify(firstName));
    this.isLoading = true;

    if (!form.valid) {
      return;
    }

    authObs = this.authService.signup(firstName, lastName, email, password);

    authObs.subscribe(
      (resData) => {
        console.log(resData);
        console.log(firstName);
        this.router.navigate(['/recipes']);
        this.isLoading = false;
        this.toastService.showSuccess(
          'You have successfully registered.',
          '',
          ''
        );
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );
    form.reset();
  }

  onHandleError() {
    this.error = null;
  }
}
