import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'villes-commerces',
    pathMatch: 'full'
  },
  {
    path: 'villes-commerces',
    loadChildren: () => import('./pages/villes-commerces/villes-commerces.module').then( m => m.VillesCommercesPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./pages/user/user.module').then( m => m.UserPageModule)
  },
  {
    path: 'commerces',
    loadChildren: () => import('./pages/commerces/commerces.module').then( m => m.CommercesPageModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./pages/categories/categories.module').then( m => m.CategoriesPageModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./pages/products/products.module').then( m => m.ProductsPageModule)
  },
  {
    path: 'details',
    loadChildren: () => import('./pages/details/details.module').then( m => m.DetailsPageModule)
  },
  {
    path: 'payments',
    loadChildren: () => import('./pages/payments/payments.module').then( m => m.PaymentsPageModule)
  },
  {
    path: 'business-owner-modal',
    loadChildren: () => import('./pages/business-owner-modal/business-owner-modal.module').then( m => m.BusinessOwnerModalPageModule)
  },
  {
    path: 'update-business-owner-modal',
    loadChildren: () => import('./pages/update-business-owner-modal/update-business-owner-modal.module').then( m => m.UpdateBusinessOwnerModalPageModule)
  },
  {
    path: 'delete-business-owner-modal',
    loadChildren: () => import('./pages/delete-business-owner-modal/delete-business-owner-modal.module').then( m => m.DeleteBusinessOwnerModalPageModule)
  },
  {
    path: 'commerce-modal',
    loadChildren: () => import('./pages/commerce-modal/commerce-modal.module').then( m => m.CommerceModalPageModule)
  },
  {
    path: 'update-commerce-modal',
    loadChildren: () => import('./pages/update-commerce-modal/update-commerce-modal.module').then( m => m.UpdateCommerceModalPageModule)
  },
  {
    path: 'delete-commerce-modal',
    loadChildren: () => import('./pages/delete-commerce-modal/delete-commerce-modal.module').then( m => m.DeleteCommerceModalPageModule)
  },
  {
    path: 'create-category-modal',
    loadChildren: () => import('./pages/create-category-modal/create-category-modal.module').then( m => m.CreateCategoryModalPageModule)
  },
  {
    path: 'update-category-modal',
    loadChildren: () => import('./pages/update-category-modal/update-category-modal.module').then( m => m.UpdateCategoryModalPageModule)
  },
  {
    path: 'delete-category-modal',
    loadChildren: () => import('./pages/delete-category-modal/delete-category-modal.module').then( m => m.DeleteCategoryModalPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
