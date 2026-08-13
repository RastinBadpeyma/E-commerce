import { Injectable, Inject } from '@nestjs/common';
import {
  ProductPublic,
  PRODUCT_PUBLIC,
} from '../../../../product/core/ports/inbound/product-public';
import { ProductQueryPort } from 'src/modules/order/core/application/ports/outbound/product-query';
import { ProductReference } from 'src/modules/order/core/domain/value-object/product-snapshot';

@Injectable()
export class ProductInternalAdapter implements ProductQueryPort {
  constructor(
    @Inject(PRODUCT_PUBLIC)
    private readonly productPublic: ProductPublic,
  ) {}

  async getProductsByIds(productIds: string[]): Promise<ProductReference[] | null> {
    if (productIds.length === 0) return [];

    const snapshots = await this.productPublic.findByIds(productIds);

    if (!snapshots || snapshots.length === 0) return null;

    return snapshots.map((snapshot) => ({
      productId: snapshot.productId,
      productName: snapshot.ProductName,
      unitPrice: snapshot.Unitprice,
      status: String(snapshot.status),
    }));
  }
}