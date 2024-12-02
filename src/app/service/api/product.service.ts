import {ApiService} from "./api.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Product} from "../../models/product.model";
import {Page} from "../../utils/page";

@Injectable({providedIn: 'root'})
export class ProductService {

  constructor(private api: ApiService) { }

  getProducts(query: string, pageIndex: number, pageSize: number): Observable<Page<Product>> {
    return this.api.get(`${ApiService.URL}/productos?nombre=${query}&page=${pageIndex}&size=${pageSize}`);
  }

  create(product: Product): Observable<Product> {
    return this.api.post(`${ApiService.URL}/productos`, product);
  }

  update(productId: number, product: Product): Observable<Product> {
    return this.api.put(`${ApiService.URL}/productos/${productId}`, product);
  }

  delete(productId: number): Observable<Product> {
    return this.api.delete(`${ApiService.URL}/productos/${productId}`);
  }
}
