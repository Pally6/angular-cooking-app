import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ToastService } from 'src/app/shared/toast-notification.service';
import { ShoppingListService } from '../shopping-list.service';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})

export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  resetSubscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  isIngredient = false;
  

  constructor(
    private slService: ShoppingListService,
    private dsService: DataStorageService,
    private toastService: ToastService
  ) {}

  
 

  ngOnInit(): void {
    this.subscription = this.slService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          amount: this.editedItem.amount,
          name: this.editedItem.name,
        });
      }
    );

    this.resetSubscription = this.slService.onFormReset.subscribe(() => {
      this.onClear();
    })
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.amount, value.name);
    if (this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
      this.dsService.storeIngredients();
      this.toastService.showInfo('Ingredient updated.', '', '');
    } else {
      this.slService.addIngredient(newIngredient);
      this.dsService.storeIngredients();
      this.toastService.showSuccess('Ingredient added.', '', '');
    }
    this.editMode = false;
    this.slForm.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDeleteAll() {
    this.isIngredient = true;
  }

  onYes() {
      this.slService.deleteIngredients();
      this.dsService.storeIngredients();
      this.toastService.showWarning('Ingredients deleted.', '', '');
      this.isIngredient = false;
      this.onClear();
  }

  onNo() {
    this.isIngredient = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.resetSubscription.unsubscribe();
  }
}
