import { Component, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { Product } from '../../service/structure/product';
import { InsertResponse } from '../../service/structure/insertResponse';
import { ProductService } from '../../service/product.service';

@Component({
    selector: 'app-product-task',
    templateUrl: './product-task.component.html',
    styleUrls: ['./product-task.component.scss'],
    providers: [ProductService]
  
})
export class ProductTaskComponent implements AfterViewChecked {
    
    products: Product[];
    productsTmp: Product[];
    selectedProduct: Product;
    submitProduct: Product;
    searchId: string;
    isSubmit: boolean;
    id: number;
    title: string;
    desci: string;
    price: number;
    message: string;
    rowNumber: number;
    alerts: Array<any> = [];
    @ViewChild('productTbl') productTbl:ElementRef;

    constructor(private productService: ProductService) {
        this.searchId = "";
        this.clear(true);
        this.getAllProducts();
    }

    ngAfterViewChecked() {

    }

    getAllProducts() {
        this.productService
        .getProducts()
        .then((products: Product[]) => {
          this.products = products["products"].map((product) => {
            return product;
          });
          this.productsTmp = this.products;
        });
    }

    onSearch() {
        if(this.searchId) {
            this.productService
            .getProductById(this.searchId)
            .then((product: Product) => {
                this.products = [];
                this.products.push(product);
                this.searchId = "";
            });
        } else {
            this.products = this.productsTmp;
        }
    }

    clear(isSubmit) {
        this.id = null;
        this.title = "";
        this.desci = "";
        this.price = 0;
        this.isSubmit = isSubmit;
    }

    selectedRow(product: Product, rowNum) {
        this.id = product.id;
        this.title = product.title;
        this.desci = product.description;
        this.price = product.price;
        this.isSubmit = false;
        this.rowNumber = rowNum;
    }

    submitForm(form: any): void{
        this.submitProduct = new Product;
        this.submitProduct.title = form.title;
        this.submitProduct.description = form.desci;
        this.submitProduct.price = form.price;
        if(this.isSubmit) {
            this.create(this.submitProduct);
        } else {
            this.update(this.id, this.submitProduct);
        }
        this.clear(true);
    }

    create(product: Product) {
        this.productService
        .createProduct(product)
        .then((res: Product) => {
          product.id = res["success"][0].id;
          this.products.push({id: product.id, title: product.title, description: product.description, price: product.price});
          console.log(this.products);
          if(product) {
            this.messagePrompt(1,'success','Insert success!');
          } else {
            this.messagePrompt(1,'warning','Insert failed!');
          }
        });
    }

    update(id:number, product: Product) {
        product.id = id;
        this.productService
        .updateProduct(product)
        .then((message: string) => {
          this.message = message;
          this.products[this.products.findIndex(x => x.id == id)].title = product.title;
          this.products[this.products.findIndex(x => x.id == id)].description = product.description;
          this.products[this.products.findIndex(x => x.id == id)].price = product.price;
          if(message["success"]==1){
            this.messagePrompt(1,'success', message["description"]);
          } else {
            this.messagePrompt(1,'warning', message["description"]);
          }
        });
    }

    removeRecord(id, rowNum) {
        this.productService
        .deleteProduct(id)
        .then((message: string) => {
          this.message = message;
          this.products.splice(this.products.findIndex(x => x.id == id),1);
          this.rowNumber = rowNum;
          document.getElementById("title"+rowNum.toString()).parentElement.remove();
          this.clear(true);
          if(message["success"]==1){
            this.messagePrompt(1,'success', message["description"]);
          } else {
            this.messagePrompt(1,'warning', message["description"]);
          }
        });
    }

    refresh() {
        this.products = [];
        this.getAllProducts();
    }

    closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }

    messagePrompt(id:number, type:string, message:string){
        this.alerts.push(
            {
                id: id,
                type: type,
                message: message
            });
    }
}
