import { Inject } from "@nestjs/common";
import { ProductPublic, ProductSnapshot } from "src/modules/product/core/ports/inbound/product-public";
import { IProductRepository } from "src/modules/product/core/ports/outbound/product-repository.port";

export class ProductPublicApi implements ProductPublic {
    constructor(
        @Inject('IProductRepository')
        private readonly productRepository: IProductRepository,
        
    ){}

    async findProductId(productId: string): Promise<ProductSnapshot | null> {
      const products = await this.productRepository.findByIds([productId]);
      const p = products[0];
      return p ?? null;
    }

    async findByIds(ids: string[]): Promise<ProductSnapshot[]> {
      return this.productRepository.findByIds(ids);
    }
}
      
