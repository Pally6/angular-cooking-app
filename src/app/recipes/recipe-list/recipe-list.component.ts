import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  subscription2: Subscription;
  recipes: Recipe[];
  
  

  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  

  ngOnInit(): void {
    this.recipeService.isLoggedIn.next();
    this.subscription2 = this.dataStorageService.fetchRecipes().subscribe();
    this.subscription = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
    //this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }
}
function loadData() {
  throw new Error('Function not implemented.');
}
