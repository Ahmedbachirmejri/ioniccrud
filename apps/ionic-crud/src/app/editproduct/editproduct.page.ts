import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'apps/ionic-crud/product.service';
import { FormBuilder, FormGroup } from '@angular/forms'
import { ProductModel } from 'apps/ionic-crud/ProductModel';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'confledis-editproduct',
  templateUrl: './editproduct.page.html',
  styleUrls: ['./editproduct.page.scss'],
})
export class EditproductPage implements OnInit {
  productId: number;
  productForm: FormGroup;
  products: ProductModel[] = [];
  filteredProducts: ProductModel[] = [];
  searchTerm = '';
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastController: ToastController
  ) {
    this.productId = 0; // Initialise productId with a default value
    this.productForm = this.formBuilder.group({
      nom: [''],
      prix: [''],
      quantite:['']
      // Other form controls for product properties
    });
  }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
  if (idParam) {
    this.productId = +idParam; // Convert 'idParam' to a number using the '+' operator
    this.productService.getProductById(this.productId.toString()).subscribe(product => {
      this.productForm.patchValue(product);
    });
  } else {
    // Handle the case where 'id' parameter is missing or null
  }
  }

  onSubmit() {
    if (this.productForm.valid) {
      const id = this.productId.toString();
      const nom = this.productForm.get('nom')?.value || '';
      const prix = this.productForm.get('prix')?.value || 0;
      const quantite = this.productForm.get('quantite')?.value || 0;
  
      const updatedProduct: ProductModel = {
        id: id,
        nom: nom,
        prix: prix,
        quantite: quantite,
        // Add other properties as needed
      };
  
      this.productService.updateProduct(id.toString(), updatedProduct).subscribe(
        () => {
          this.presentToast('Produit modifié avec succès.').then(() => {
            this.loadProducts();
            this.router.navigate(['/products-list']);
          });
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        error => {
          this.presentToast('Une erreur s\'est produite lors de l\'update du produit.');
        }
      );
    }
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
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, // Durée en millisecondes
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