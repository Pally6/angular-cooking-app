import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { ToastService } from 'src/app/shared/toast-notification.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipes.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss'],
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe;
  id: number;
  isDelete = false;
  

  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) {}

  

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipe(this.id);
    });
    
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    this.toastService.showInfo('Ingredients added to Shopping List', '', '');
    this.dataStorageService.storeIngredients();
    this.recipeService.getRecipeName(this.recipe);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes'], { relativeTo: this.route });
    this.dataStorageService.storeRecipes();
  }

  clickMethod() {
    this.isDelete = true;
  }

  onYes() {
    this.onDeleteRecipe();
    this.toastService.showWarning('Recipe deleted.', '', '');
    this.isDelete = false;
  }

  onNo() {
    this.isDelete = false;
  }
}
