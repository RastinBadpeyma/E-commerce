import { Inject, Injectable } from "@nestjs/common";
import { Product } from "../../../domain/entities/product.entity";
import { IProductRepository } from "../../../ports/out/product-repository.port";

@Injectable()
export class GetProductsUseCase {
  constructor(
    @Inject("IProductRepository")
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(): Promise<Product[]> {
    return this.productRepository.findMany();
  }
}