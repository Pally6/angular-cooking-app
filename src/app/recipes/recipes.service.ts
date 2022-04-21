import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  //private recipes: Recipe[] = [
  //  new Recipe(
  //    'A Test Recipe',
  //    'Simple Test',
  //    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj7jnvdvgIMjXV0Qk4y-Mtz4xlZ5lbb-T3uQ&usqp=CAU',
  //    [new Ingredient('meat', 2), new Ingredient('fries', 20)]
  //  ),
  //  new Recipe(
  //    'Another Test Recipe',
  //    'Another Simple Test',
  //    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj7jnvdvgIMjXV0Qk4y-Mtz4xlZ5lbb-T3uQ&usqp=CAU',
  //    [new Ingredient('meat', 1), new Ingredient('fries', 20)]
  //  ),
  //];

  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) {}

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

  deleteRecipe(index:number){
    this.recipes.splice(index, 1);
    this.updateRecipesChanged();
  }

  updateRecipesChanged() {
    this.recipesChanged.next(this.recipes.slice());
  };
}
