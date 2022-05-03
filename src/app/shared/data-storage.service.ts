import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

import { Recipe } from '../recipes/recipe.model';

import { RecipeService } from '../recipes/recipes.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Ingredient } from './ingredient.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  recipe: Recipe;
  ingredients: Ingredient;

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private slService: ShoppingListService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://ng-project-666-default-rtdb.firebaseio.com/recipes.json',
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
        'https://ng-project-666-default-rtdb.firebaseio.com/ingredients.json',
        ingredients
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://ng-project-666-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        tap((recipes) => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }

  fetchIngredients() {
    return this.http
      .get<Ingredient[]>(
        'https://ng-project-666-default-rtdb.firebaseio.com/ingredients.json'
      )
      .pipe(
        tap((ingredients) => {
          this.slService.setIngredients(ingredients);
        })
      );
  }
}
