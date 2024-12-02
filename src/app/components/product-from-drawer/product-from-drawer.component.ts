import {Component, OnInit} from '@angular/core';
import {NgbActiveOffcanvas, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Product} from "../../models/product.model";

@Component({
  selector: 'product-from-drawer',
  templateUrl: './product-from-drawer.component.html',
  styleUrls: ['./product-from-drawer.component.scss']
})
export class ProductFromDrawerComponent implements OnInit {
  form: FormGroup;
  isnew: boolean = true;

  constructor(private config: NgbModalConfig,
              private activeModal: NgbActiveOffcanvas,
              private fb: FormBuilder) {
    this.config.backdrop = 'static';
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      stock: ['', Validators.required],
    });

  }

  ngOnInit(): void {
  }

  setFormValue(producto: Product) {
    this.isnew = false;

    this.form.setValue({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      stock: producto.stock
    });
  }

  save() {
    if (this.form.invalid) return;

    const result: Product = this.form.value;
    this.activeModal.close(result);
  }

  dismiss() {
    this.activeModal.dismiss('Dismiss');
  }
}
