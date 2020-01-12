import { ProductService } from './../../services/product.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';




@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'price', 'quantity',  'expireIn', 'editBtn'];
  dataSource: MatTableDataSource<any>;
  products = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.productService.getProductsNoIndex().subscribe((p: any) => {
      this.products.push(...p);
      this.dataSource = new MatTableDataSource(this.products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    // this.products = this.productService.products;
    // this.dataSource = new MatTableDataSource(this.products);
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onEditProduct(product) {
    console.log(product, 111);
    this.router.navigate(['new-product'],
      {
        queryParams: {
          _id: product._id,
          name: product.name,
          price: product.price,
          expireIn: product.expireIn,
          quantity: product.quantity,
          imageUrl: product.imageUrl,
          category: product.category
        }
      }
    );
  }

}
