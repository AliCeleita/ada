import {Component, QueryList, ViewChildren} from '@angular/core';
import {Product} from "../../models/product.model";
import {FormControl} from "@angular/forms";
import {NgbdSortableHeaderDirective} from "../../ngbd-sortable-header.directive";
import {ProductService} from "../../service/api/product.service";
import {ToolbarService} from "../../service/tooldbar.service";
import {AlertService} from "../../service/alert.service";
import {NgbModal, NgbOffcanvas} from "@ng-bootstrap/ng-bootstrap";
import {Page} from "../../utils/page";
import {HttpErrorResponse} from "@angular/common/http";
import {debounceTime} from "rxjs";
import {IProductForm} from "../../utils/product.form";
import {ProductFromDrawerComponent} from "../../components/product-from-drawer/product-from-drawer.component";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products: Product[] = [];
  total: number = 0;
  loading: boolean = true;
  isLast: boolean = true;

  private _querySearch: string = '';
  _page: number = 0;
  private _pageSize: number = 5;

  searchCtrl: FormControl = new FormControl();

  @ViewChildren(NgbdSortableHeaderDirective) headers!: QueryList<NgbdSortableHeaderDirective>;

  constructor(private productService: ProductService,
              private modalService: NgbOffcanvas,
              private alertService: AlertService,
              public toolbar: ToolbarService) { }

  get querySearch() {
    return this._querySearch;
  }



  set page(value: number) {
    this._page = value - 1;
    this.searchProducts(this.searchCtrl.value, this._page, this.pageSize);
  }

  set pageSize(value: number) {
    this._pageSize = value;
    this.searchProducts(this.searchCtrl.value, this.page-1, this._pageSize);
  }

  get page() {
    return this._page;
  }

  get pageSize() {
    return this._pageSize;
  }

  ngOnInit(): void {
    this.searchProducts();

    this.toolbar.onSearch$.subscribe((value: string) => this.searchProducts(value));

    this.toolbar.onNew
      .pipe(debounceTime(500))
      .subscribe(this.onNewClient);
  }

  searchProducts( query: string = '', page: number = 0, pageSize: number = 5) {
    this.loading = true;
    this.productService.getProducts(query || '', page, pageSize)
      .pipe(
        debounceTime(300)
      )
      .subscribe({
        next: this.OnResult
      })
      .add(() => this.loading = false);
  }

  OnResult = (page: Page<Product>) => {
    this.total = page.totalElements;
    this.products = page.content;
    this._page = page.number + 1;
    this.isLast = page.last;
  }

  onNewClient = async () => {
    const offcanvasRef = this.modalService.open(ProductFromDrawerComponent, {
      position: 'end',
      backdrop: true,
      scroll: true
    });
    const result: IProductForm = await offcanvasRef.result;

    this.productService.create(result)
      .subscribe({ next: this.onCreateSuccess, error: this.onError})
  }

  async edit(item: Product) {
    const offcanvasRef = this.modalService.open(ProductFromDrawerComponent, {
      position: 'end',
      backdrop: true,
      scroll: true
    });
    const instance: ProductFromDrawerComponent = offcanvasRef.componentInstance;
    instance.setFormValue(item);

    offcanvasRef.result.then((result: IProductForm) => {
      this.productService.update(item.id, result)
        .subscribe({ next: this.onEditSuccess, error: this.onError });
    });
  }

  async delete(item: Product) {
    this.productService.delete(item.id)
      .subscribe({ next: this.onDeleteSuccess, error: this.onError });
  }

  onEditSuccess = () => {
    this.alertService.success('Producto editado exitosamente');
    this.searchProducts(this.querySearch, this.page, this.pageSize);
  }

  onDeleteSuccess = () => {
    this.alertService.success('Producto eliminado exitosamente.');
    this.searchProducts( this.querySearch, this.page, this.pageSize);
  }

  onCreateSuccess = () => {
    this.alertService.success('Producto creado exitosamente.');
    this.searchProducts(this.querySearch, this.page, this.pageSize);
  }

  onError = (error: HttpErrorResponse) => {
    const message = error.error?.message || 'Ha ocurrido un error.';
    this.alertService.error(message);
  }
}
