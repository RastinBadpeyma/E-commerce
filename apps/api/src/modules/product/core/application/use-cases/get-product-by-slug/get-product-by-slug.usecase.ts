import { Inject, Injectable } from "@nestjs/common";
import { IProductRepository } from "../../../ports/out/product-repository.port";
import { Product } from "../../../domain/entities/product.entity";
import { ProductNotFoundError } from "../../../domain/errors/product-not-found.error";

@Injectable()
export class getProductBySlugUseCase {
    constructor(
      @Inject('IProductRepository')
      private readonly productRepository: IProductRepository,
    ){}

     async execute(slug:string): Promise<Product | null>{
      const product = await this.productRepository.findBySlug(slug);
      if (!product) {
        throw new ProductNotFoundError(slug)
      }
      return product;
    }
}