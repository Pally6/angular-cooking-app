import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {
  name: any;

  constructor() {}
  
  ngOnInit(): void {
    this.name = JSON.parse(localStorage.getItem('userName'));
  }
}
