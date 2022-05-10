import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { AuthRoutingModule } from "./auth-routing.module";

import { AuthComponent } from "./auth.component";
import { RegisterComponent } from "./register.component";


@NgModule({
    declarations: [
      AuthComponent,
      RegisterComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        AuthRoutingModule
    ],
    
  })
  export class AuthModule { }