import { Inject, Injectable } from "@nestjs/common";
import { IProductRepository } from "../../../ports/outbound/product-repository.port";
import {
  ProductStatus,
} from "../../../domain/entities/product.entity";
import { ProductNotFoundError } from "../../../domain/errors/product-not-found.error";
import { GetProductBySlugOutput } from "../../../ports/inbound/find-products";

@Injectable()
export class GetProductBySlugUseCase {
  constructor(
    @Inject("IProductRepository")
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(slug: string): Promise<GetProductBySlugOutput | null> {
    const product = await this.productRepository.findBySlug(slug);

    if (!product || product.status === ProductStatus.INACTIVE) {
      throw new ProductNotFoundError(slug)
    }
    return {
      title: product.title,
      description: product.description,
      price:
        product.status === ProductStatus.OUT_OF_STOCK
          ? undefined
          : product.price,
      quantity:
        product.status === ProductStatus.OUT_OF_STOCK
          ? undefined
          : product.quantity,
      status: product.status,
      updatedAt: product.updatedAt,
    };
  }
}
