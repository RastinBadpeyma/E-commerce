import { Inject, Injectable } from "@nestjs/common";
import { ProductStatus } from "../../../domain/entities/product.entity";
import { IProductRepository } from "../../../ports/outbound/product-repository.port";
import { FindProducts, FindProductsOutput, PaginatedProducts } from "../../../ports/outbound/find-product.input";

@Injectable()
export class GetProductsUseCase {
  constructor(
    @Inject("IProductRepository")
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(input: FindProducts = {}): Promise<PaginatedProducts> {
    const limit = Math.min(input.limit ?? 20, 100); 
    const result = await this.productRepository.findMany({ ...input, limit });


    const activeProducts = result.items.filter(
      product => product.status !== ProductStatus.INACTIVE
    );
    const items: FindProductsOutput[] = activeProducts.map(product => ({
      title: product.title,
      price: product.status === ProductStatus.OUT_OF_STOCK ? undefined : product.price,
      status: product.status,
      updatedAt: product.updatedAt,
    }));

    return {
      items,
      nextCursor: result.nextCursor,
      hasMore: result.hasMore
    }
  }
}