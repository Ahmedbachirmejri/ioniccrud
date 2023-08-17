import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductsListPageRoutingModule } from './products-list-routing.module';

import { ProductsListPage } from './products-list.page';
import { ProductService } from 'apps/ionic-crud/product.service'
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductsListPageRoutingModule,
  ],
  declarations: [ProductsListPage],
  providers: [ProductService],
})
export class ProductsListPageModule {}
