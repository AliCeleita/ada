import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFromDrawerComponent } from './product-from-drawer.component';

describe('ProductFromDrawerComponent', () => {
  let component: ProductFromDrawerComponent;
  let fixture: ComponentFixture<ProductFromDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductFromDrawerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductFromDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
