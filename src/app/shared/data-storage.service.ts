import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipes.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Ingredient } from './ingredient.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  recipe: Recipe;
  ingredients: Ingredient;
  loggedUser: string = null;

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private slService: ShoppingListService,
  ) {}

  storeUsers(userData) {
    const userId = {userId:""};
    userId.userId = userData;
    this.loggedUser = JSON.stringify(userId);
    localStorage.setItem('userId', this.loggedUser);
    console.log(this.loggedUser);
    this.http
      .put(
        `https://ng-project-666-default-rtdb.firebaseio.com/loggedUsers.json`,
        userId
      ).subscribe((userId) => {
        console.log(userId);
      });
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        `https://ng-project-666-default-rtdb.firebaseio.com/${this.loggedUser}/recipes.json`,
        recipes
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  storeIngredients() {
    const ingredients = this.slService.getIngredients();
    this.http
      .put(
        `https://ng-project-666-default-rtdb.firebaseio.com/${this.loggedUser}/ingredients.json`,
        ingredients
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchRecipes() {
    if(!this.loggedUser) {
        this.loggedUser = localStorage.getItem('userId');
        console.log(JSON.stringify(this.loggedUser));
        
    }
      return this.http
      .get<Recipe[]>(
        `https://ng-project-666-default-rtdb.firebaseio.com/${this.loggedUser}/recipes.json`
      )
      .pipe(
        tap((recipes) => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }

  fetchIngredients() {
    if(!this.loggedUser) {
      this.loggedUser = localStorage.getItem('userId');
      console.log(JSON.stringify(this.loggedUser));
      
  }
    return this.http
      .get<Ingredient[]>(
        `https://ng-project-666-default-rtdb.firebaseio.com/${this.loggedUser}/ingredients.json`
      )
      .pipe(
        tap((ingredients) => {
          this.slService.setIngredients(ingredients);
        })
      );
  }
}
