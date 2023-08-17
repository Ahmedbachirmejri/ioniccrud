import { Component } from '@angular/core';
import { ProductService } from 'apps/ionic-crud/product.service';
import { Router } from '@angular/router';
import { ProductModel } from 'apps/ionic-crud/ProductModel';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'confledis-addproduct',
  templateUrl: './addproduct.page.html',
  styleUrls: ['./addproduct.page.scss'],
})
export class AddproductPage {
  products: ProductModel[] = [];
  filteredProducts: ProductModel[] = [];
  searchTerm = '';
  newProduct: ProductModel = {
    id :'',
    nom: '',
    prix: 0,
    quantite: 0,
    // Add other properties as needed
  };

  constructor(
    private productService: ProductService,
    private router: Router,
    private toastController: ToastController
  ) {}
  loadProducts() {
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products;
      this.filteredProducts = products; 
    },
    (error) => {
      console.error('Error fetching products:', error);
    });
  }
  onSubmit() {
    if (this.newProduct.nom && this.newProduct.prix !== null && this.newProduct.quantite !== null) {
      this.productService.addProduct(this.newProduct).subscribe(
        () =>  {
          this.presentToast('Produit ajouté avec succès.').then(() => {
            this.loadProducts()
            this.router.navigate(['/products-list']);
          });
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        error => {
          this.presentToast('Une erreur s\'est produite lors de l\'ajout du produit.');
        }
      );
    }
  }
  
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000, // Durée en millisecondes
      position: 'bottom' // Position du toast (top, middle, bottom)
    });
  
    toast.present();
  
    return toast.onDidDismiss();
  }
  filterProducts() {
    if (this.searchTerm.trim() === '') {
      this.filteredProducts = this.products;
    } else {
      const searchTermLower = this.searchTerm.toLowerCase();
      this.filteredProducts = this.products.filter(product =>
        product.nom.toLowerCase().includes(searchTermLower)
      );
    }
  }
}
