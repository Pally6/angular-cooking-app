import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  recipeName  = new Subject<Recipe>()
  recipesChanged = new Subject<Recipe[]>();
  reccName: any

  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) { this.recipeName.subscribe((recName) => {
    this.reccName = recName.name;
  });}

  getRecipeName(recipe: Recipe) {
    const rec:Recipe = recipe
    this.recipeName.next(rec)
  }

  
  
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.updateRecipesChanged();
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.updateRecipesChanged();
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.updateRecipesChanged();
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.updateRecipesChanged();
  }

  updateRecipesChanged() {
    this.recipesChanged.next(this.recipes.slice());
  }
}
