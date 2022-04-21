import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {
  

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    
     
  }

  email = this.authService.user.value.email;
  
  
  
 

  
    
  }

  

