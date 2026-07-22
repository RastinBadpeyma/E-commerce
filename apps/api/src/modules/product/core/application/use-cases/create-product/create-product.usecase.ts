import { Inject, Injectable } from '@nestjs/common';
import { CreateProductInput, IProductRepository } from '../../../domain/ports/product-repository.port';
import { Product } from '../../../domain/entities/product.entity';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  execute(command: CreateProductInput): Promise<Product> {
    if (command.price < 0) {
       console.log('invalid price error')
    }
    if(command.quantity < 0) {
      console.log('invalid quantity error')
    }

    return this.productRepository.create(command);
  }
}
