import { Component , OnInit } from '@angular/core';
import { ProductService } from 'apps/ionic-crud/product.service';
import { ProductModel } from 'apps/ionic-crud/ProductModel';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'confledis-products-list',
  templateUrl: './products-list.page.html',
  styleUrls: ['./products-list.page.scss'],
})
export class ProductsListPage implements OnInit {

  products: ProductModel[] = [];
  filteredProducts: ProductModel[] = [];
  searchTerm = '';

  constructor(private productService: ProductService,
    private navCtrl: NavController
    ,private router: Router,
    private alertController : AlertController ,
    private toastController: ToastController
    ) {
    this.loadProducts();
  }
  ngOnInit() {
    this.productService.products$.subscribe(products => {
      this.products = products;
      this.filteredProducts = products; 
    });
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products;
      this.filteredProducts = products; 
    },
    (error) => {
      console.error('Error fetching products:', error);
    });
  }

  updateProduct(product: ProductModel) {
    this.navCtrl.navigateForward(`/editproduct/${product.id}`);
    this.loadProducts();
  }

  async deleteProduct(product: ProductModel) {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: `Voulez-vous vraiment supprimer le produit "${product.nom}"?`,
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // L'utilisateur a choisi d'annuler
          }
        }, {
          text: 'Supprimer',
          handler: () => {
            this.productService.deleteProduct(product.id).subscribe(
              () => {
                this.presentToast('Produit supprimé avec succès.');
                this.loadProducts();
              },
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              error => {
                this.presentToast('Une erreur s\'est produite lors de la suppression du produit.');
              }
            );
          }
        }
      ]
    });
  
    await alert.present();
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
  goToAddProductPage() {
    this.router.navigate(['/addproduct']);
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