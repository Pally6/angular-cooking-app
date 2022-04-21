import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";




@Injectable ({providedIn: 'root'})

export class ToastService {

    constructor(private toastr: ToastrService ) {}


    showSuccess(message: string, message2: string, div: any) {
        this.toastr.success(message, message2, div)
    };

    showError(message: string, message2: string, div: any) {
        this.toastr.error(message, message2, div)
    };

    showInfo(message: string, message2: string, div: any) {
        this.toastr.info(message, message2, div)
    };

    showWarning(message: string, message2: string, div: any) {
        this.toastr.warning(message, message2, div)
    };



}