import { Component, OnInit } from "@angular/core";
import { ToastService } from "./toast-notification.service";

@Component({
    selector: 'app-toast',
    templateUrl: './toast-notification.component.html',
    styleUrls: ['./toast-notification.component.scss'],
    })
  export class ToastComponent implements OnInit {

    constructor(private toastService: ToastService) {}



    ngOnInit(): void {}

   
    showToastSuccess() {
      this.toastService.showSuccess("This is Successs.", "", "")
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

  }