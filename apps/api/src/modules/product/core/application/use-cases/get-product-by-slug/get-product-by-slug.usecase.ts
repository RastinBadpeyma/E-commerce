import { Inject, Injectable } from "@nestjs/common";
import { IProductRepository } from "../../../ports/out/product-repository.port";
import { Product } from "../../../domain/entities/product.entity";

@Injectable()
export class getProductBySlugUseCase {
    constructor(
      @Inject('IProductRepository')
      private readonly productRepository: IProductRepository,
    ){}

     execute(slug:string){
      return this.productRepository.findBySlug(slug);
    }
}