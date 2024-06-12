import { Component, OnInit, inject } from '@angular/core';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { FormsModule } from '@angular/forms';
import { ProductsFilterPipe } from '../../shared/pipes/products-filter.pipe';
import { ProductsService } from '../../shared/services/products.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { CartService } from '../../shared/services/cart.service';
import { PaginatorComponent } from '../../shared/components/paginator/paginator.component';

type Direction = 'asc' | 'desc';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ProductCardComponent,
    FormsModule,
    ProductsFilterPipe,
    AsyncPipe,
    PaginatorComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);

  products$ = this.productsService.products$;
  pagination$ = this.productsService.productPagination$;
  priceSort: Direction = 'asc';

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((paramMap) => {
      const pageSize =
        Number(paramMap.get('page_size')) || this.pagination$.value.pageSize;
      const pageIndex =
        Number(paramMap.get('page_index')) || this.pagination$.value.pageIndex;

      this.productsService.getProducts({
        page_size: pageSize,
        page_index: pageIndex,
      });
    });
  }

  onAddToCart(id: string) {
    this.cartService.addToCart(id, 1);
  }

  onPriceSortChange() {
    this.router.navigate([''], {
      queryParams: {
        priceSort: this.priceSort,
      },
    });
  }

  onPaginationChange(pageIndex: number, pageSize: number) {
    this.router.navigate(['.'], {
      queryParams: {
        page_index: pageIndex,
        page_size: pageSize,
      },
    });
  }
}
