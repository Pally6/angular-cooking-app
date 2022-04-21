import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


import { AlertComponent } from './alert/alert.component';
import { DropdownDirective } from './dropdown.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { ToastComponent } from './toast-notification.component';

@NgModule({
  declarations: [DropdownDirective, LoadingSpinnerComponent, ToastComponent, AlertComponent],

  imports: [CommonModule, 
    ],

  exports: [
    CommonModule,
    DropdownDirective,
    LoadingSpinnerComponent,
    AlertComponent,
    ToastComponent,
    
  ],
})
export class SharedModule {}
