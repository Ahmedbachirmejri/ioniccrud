import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { EditproductPageRoutingModule } from './editproduct-routing.module';

import { EditproductPage } from './editproduct.page';
import { ProductService } from 'apps/ionic-crud/product.service'
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditproductPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [EditproductPage],
  providers: [ProductService],
})
export class EditproductPageModule {}
