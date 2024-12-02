import { NgModule } from '@angular/core';
import {HomeComponent} from "./pages/home/home.component";
import {ProductsComponent} from "./pages/products/products.component";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: 'home', component: HomeComponent,
    children: [
      { path: 'products', component: ProductsComponent },
    ]
  },
  { path: '**', redirectTo: 'home/products' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
