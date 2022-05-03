import { Component, OnInit, Input,  } from "@angular/core";
import { ToastService } from "./toast-notification.service";

@Component({
    selector: 'app-toast',
    templateUrl: './toast-notification.component.html',
    styleUrls: ['./toast-notification.component.css'],
  })
  export class ToastComponent implements OnInit {

    constructor(private toastService: ToastService) {}



    ngOnInit(): void {}

   
    showToastSuccess() {
      this.toastService.showSuccess("You have successfully logged in.", "", "")
    };


    showToastError() {
      this.toastService.showError("You got an error.", "", "")
    };

    showToastInfo() {
      this.toastService.showInfo("This is for Info.", "", "")
    };

    showToastWarning() {
      this.toastService.showWarning("Warning Bad.", "", "")
    };


  //  fruits = ['apple', 'pear', 'banana', 'coconut'];
  //  
  //  onDelete() {
  //    
  //  }
    
}