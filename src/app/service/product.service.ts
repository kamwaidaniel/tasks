import { Injectable } from '@angular/core';
import { Product } from './structure/product';
import { InsertResponse } from './structure/insertResponse';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProductService {
    private productsUrl = 'https://shielded-sea-70042.herokuapp.com/product';

    constructor (private http: Http) {}

    // get("/api/products")
    getProducts(): Promise<void | Product[]> {
      console.log(this.productsUrl);
      return this.http.get(this.productsUrl)
                 .toPromise()
                 .then(response => response.json() as Product[])
                 .catch(this.handleError);
    }

    // get("/api/products")
    getProductById(Id): Promise<void | Product> {
        return this.http.get(this.productsUrl+'/'+Id)
                    .toPromise()
                    .then(response => response.json() as Product)
                    .catch(this.handleError);
    }

    // post("/api/products")
    createProduct(newProduct: Product): Promise<void | Product> {
      return this.http.post(this.productsUrl, newProduct)
                 .toPromise()
                 .then(response => response.json() as Product)
                 .catch(this.handleError);
    }

    // get("/api/products/:id") endpoint not used by Angular app

    // delete("/api/products/:id")
    deleteProduct(delProductId: String): Promise<void | String> {
      return this.http.delete(this.productsUrl + '/' + delProductId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    // put("/api/products/:id")
    updateProduct(putProduct: Product): Promise<void | String> {
      var putUrl = this.productsUrl + '/' + putProduct.id;
      return this.http.put(putUrl, putProduct)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}