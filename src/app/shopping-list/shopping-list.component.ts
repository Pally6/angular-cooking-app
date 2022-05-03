import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipes.service';
import { DataStorageService } from '../shared/data-storage.service';
import { Ingredient } from '../shared/ingredient.model';
import { ToastService } from '../shared/toast-notification.service';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  
  @Input() ingredients: Ingredient[];
  @Input() recipe: Recipe[];
  private igChange: Subscription;
  private isStartedEditing: Subscription;
  isIngredient = false;
  editedItemIndex: number;

  constructor(
    private dsService: DataStorageService,
    private toastService: ToastService,
    private recipeService: RecipeService,
    private slService: ShoppingListService
  ) {}

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredients();
    this.igChange = this.slService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );

    

    this.dsService.fetchIngredients().subscribe();
    this.isStartedEditing = this.slService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        
      }
    );
  }

  removeIngredient() {
    this.slService.deleteIngredient(this.editedItemIndex);
      this.dsService.storeIngredients();
      this.toastService.showWarning('Ingredient deleted.', '', '');
      this.isIngredient = false;
  }

  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
    this.igChange.unsubscribe();
    this.isStartedEditing.unsubscribe();
  }
}
