import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, ViewEncapsulation, Output, EventEmitter } from "@angular/core";
import { Subscription } from 'rxjs';
import { Product } from './products/model/product.model';
import { ProductsService } from './products/products.service';
import { ProductFilter } from './products/model/product-filter.model';
import { StockStatusEnum } from './products/enum/stock-status.enum';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy {

  title = "ir-dev-test";

  private subs: Subscription = new Subscription();

  readonly DEFAULT_PRODUCT_BRAND: string = "All";
  readonly STOCK_STATUS_ALL: string = "all";
  readonly STOCK_STATUS_INSTOCK: string = "in-stock";
  readonly STOCK_STATUS_OUTOFSTOCK: string = "out-of-stock";

  products: Product[] = [];
  productBrands: string[] = [];

  productFilter: ProductFilter = { brand: this.DEFAULT_PRODUCT_BRAND, search: null, stockStatus: StockStatusEnum.All };



  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.getProductList();
  }

  productBrandDropdDownOnChanged(brand: string): void {
    let filter: ProductFilter = { brand: brand, search: this.productFilter.search, stockStatus: this.productFilter.stockStatus};
    this.productFilter = filter;
  }

  productStockStatusOnChanged(status: string): void {
    let filter: ProductFilter = { brand: this.productFilter.brand, search: this.productFilter.search, stockStatus: this.productFilter.stockStatus };
    if (status == this.STOCK_STATUS_ALL)
      filter.stockStatus = 1;
    else if (status == this.STOCK_STATUS_INSTOCK)
      filter.stockStatus = 2;
    else
      filter.stockStatus = 3;

    this.productFilter = filter;
  }

  onProductItemSearched(search: string): void {
    let filter: ProductFilter = { brand: this.productFilter.brand, search: search, stockStatus: this.productFilter.stockStatus };
    if (search.length >= 3) {
      this.productFilter = filter;
    }
    else if (search.length == 0) {
      filter.search = null;
      this.productFilter = filter;
    }
  }

  private getProductList(): void {
    this.subs.add(
      this.productService.getProducts()
        .subscribe(data => {
          this.products = data;
          this.getProductBrands(data);
        })
    );
  }

  private getProductBrands(products: Product[]): void {
    this.productBrands = products.map(x => x.brand).filter((x, i, a) => a.indexOf(x) == i);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}


