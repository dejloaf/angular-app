import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { IProduct } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';

declare const Tabulator: any;

@Component({
  selector: 'app-products-table',
  standalone: false,
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.scss',
})
export class ProductsTableComponent implements OnInit, AfterViewInit {
  @ViewChild('table', { static: false }) tableRef!: ElementRef<HTMLDivElement>;
  table: any;
  loading = true;
  products: IProduct[] = [];

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productsService.getAll().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
        if (this.table) {
          this.table.setData(this.products);
        }
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  ngAfterViewInit(): void {
    this.table = new Tabulator(this.tableRef.nativeElement, {
      data: [],
      layout: 'fitColumns',
      pagination: 'local',
      paginationSize: 5,
      placeholder: 'Нет данных',
      columns: [
        { title: 'ID', field: 'id', width: 60 },
        { title: 'Название', field: 'title', headerFilter: 'input' },
        { title: 'Категория', field: 'category', headerFilter: 'input' },
        { title: 'Цена, $', field: 'price', hozAlign: 'right' },
        { title: 'Рейтинг', field: 'rating.rate', hozAlign: 'center' },
      ],
    });
    this.table.on('rowClick', (e: any, row: any) => {
      const id = row.getData().id;
      console.log('Row clicked, id =', id);
      this.router.navigate(['/product', id]);
    });

    if (this.products.length) {
      this.table.setData(this.products);
    }
  }
}
