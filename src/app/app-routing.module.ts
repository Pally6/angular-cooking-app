import {  NgModule } from '@angular/core';
import { PreloadAllModules,  RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register.component';
import { ToastComponent } from './shared/toast-notification.component';



const routes: Routes = [
  
  { path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'register', component: RegisterComponent },
  { path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule) },
  { path: 'toast', component: ToastComponent },
  { path: '**', redirectTo: 'auth', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
