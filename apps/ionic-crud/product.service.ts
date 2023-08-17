import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from './ProductModel';

import { BehaviorSubject,Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsSubject = new BehaviorSubject<ProductModel[]>([]);
  public products$ = this.productsSubject.asObservable();

  constructor(private http: HttpClient, private toastController: ToastController) {this.loadProducts(); }

  baseurl = "http://localhost:8000/";

  loadProducts() {
    this.http.get<ProductModel[]>(this.baseurl + 'product/').subscribe(products => {
      this.productsSubject.next(products);
    });
  }

  getAllProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.baseurl + 'product/')
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addProduct(product: ProductModel): Observable<any> {
    return this.http.post(this.baseurl + 'product/new', product);
  }

  getProductById(id: string): Observable<ProductModel> {
    return this.http.get<ProductModel>(this.baseurl + 'product/' + id)
      
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deleteProduct(id: string): Observable<any> {
    return this.http.delete(this.baseurl + 'product/'  + id)
     
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateProduct(productId: string, product: ProductModel): Observable<any> {
    return this.http.put(this.baseurl + 'product/' + productId + '/edit', product);
  }

}
