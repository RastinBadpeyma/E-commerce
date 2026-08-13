import { Injectable, Inject } from '@nestjs/common';
import {
  ProductPublic,
  PRODUCT_PUBLIC,
} from '../../../../product/core/ports/inbound/product-public';
import { ProductQueryPort } from 'src/modules/order/core/application/outbound/product-query';
import { ProductReference } from 'src/modules/order/core/domain/value-object/product-snapshot';

@Injectable()
export class ProductInternalAdapter implements ProductQueryPort {
  constructor(
    @Inject(PRODUCT_PUBLIC)
    private readonly productPublic: ProductPublic,
  ) {}

  async findProduct(productId: string): Promise<ProductReference | null> {
    const snapshot = await this.productPublic.findProductId(productId);
    if (!snapshot) return null;

    return {
      productId: snapshot.productId,
      productName: snapshot.ProductName,
      unitPrice: snapshot.Unitprice,
      status: snapshot.status,
    };
  }
}