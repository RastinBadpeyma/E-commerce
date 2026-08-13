import { Inject } from "@nestjs/common";
import { ProductPublic, ProductSnapshot } from "src/modules/product/core/ports/inbound/product-public";
import { IProductRepository } from "src/modules/product/core/ports/outbound/product-repository.port";

export class ProductPublicApi implements ProductPublic {
    constructor(
        @Inject('IProductRepository')
        private readonly productRepository: IProductRepository,
        
    ){}

    async findProductId(productId: string): Promise<ProductSnapshot | null> {
      const product = await this.productRepository.findById(productId);
      if (!product) {
        return null
      } 
      return {
       productId: product._id,
       ProductName: product.title,
       Unitprice: product.price,
       status: product.status
      }
    }       
}
      
