import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { ToastService } from '../shared/toast-notification.service';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(
    private authService: AuthService,
    private dataStorageService: DataStorageService,
    private router: Router,
    private toastService: ToastService
  ) {}

  onSignUp() {
    this.router.navigate(['/register']);
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    let authObs: Observable<AuthResponseData>;

    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    }
    authObs.subscribe(
      (resData) => {
        console.log(resData);
        this.dataStorageService.storeUsers(resData.localId)
        this.router.navigate(['/recipes']);
        this.toastService.showSuccess(
          'You have successfully logged in.',
          '',
          ''
        );
        this.isLoading = false;
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
