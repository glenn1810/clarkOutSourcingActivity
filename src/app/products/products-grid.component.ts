import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, ViewEncapsulation, Input, OnChanges, SimpleChanges } from "@angular/core";
import { Subscription } from 'rxjs';
import { ProductsService } from './products-test.service';
import { Product } from './model/product.model';
import { ProductFilter } from './model/product-filter.model';

@Component({
  selector: "products-table",
  templateUrl: "products-grid.component.html",
  styleUrls: ['products-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ProductsGridComponent implements OnInit,OnChanges, OnDestroy {

  @Input() products: Product[];
  @Input() filter: ProductFilter;

  private subs: Subscription = new Subscription();


  constructor(private productService: ProductsService)
  { }

  ngOnInit(): void {
 
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products']) {
      console.log(this.products);
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
