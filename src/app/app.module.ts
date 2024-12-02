import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { TableComponent } from './components/table/table.component';
import { AppRoutingModule } from './app-routing.module';
import {FaIconLibrary, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NgOptimizedImage} from "@angular/common";
import {NgbDropdownModule, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {AlertService} from "./service/alert.service";
import {NgxSelectModule} from "ngx-select-ex";
import {HttpClientModule} from "@angular/common/http";
import {ProductsComponent} from "./pages/products/products.component";
import {ProductFromDrawerComponent} from "./components/product-from-drawer/product-from-drawer.component";
import {ProductService} from "./service/api/product.service";
import {ToolbarService} from "./service/tooldbar.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    TableComponent,
    ProductFromDrawerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgxSelectModule,
    NgOptimizedImage
  ],
  providers: [ProductService, ToolbarService, AlertService,],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}
