import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'editproduct',
    loadChildren: () =>
      import('./editproduct/editproduct.module').then(
        (m) => m.EditproductPageModule
      ),
  },
  {
    path: 'addproduct',
    loadChildren: () =>
      import('./addproduct/addproduct.module').then(
        (m) => m.AddproductPageModule
      ),
  },
  {
    path: 'products-list',
    loadChildren: () =>
      import('./products-list/products-list.module').then(
        (m) => m.ProductsListPageModule
      ),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
