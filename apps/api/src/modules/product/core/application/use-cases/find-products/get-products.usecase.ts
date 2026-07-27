import { Inject, Injectable } from "@nestjs/common";
import { Product } from "../../../domain/entities/product.entity";
import { IProductRepository } from "../../../ports/out/product-repository.port";
import { FindProductsInput, PaginatedProducts } from "../../../ports/in/find-products";

@Injectable()
export class GetProductsUseCase {
  constructor(
    @Inject("IProductRepository")
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(input: FindProductsInput = {}): Promise<PaginatedProducts> {
    const limit = Math.min(input.limit ?? 20, 100); 
    return this.productRepository.findMany({ ...input, limit });
  }
}