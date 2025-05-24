import { Component, Input } from '@angular/core';
import { IProduct } from '../../models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  standalone: false,
})
export class ProductComponent {
  @Input() product: IProduct;

  details = false;

  toggleDescription(): void {
    this.details = !this.details;
  }
}
