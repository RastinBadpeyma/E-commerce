import { Inject, Injectable } from '@nestjs/common';
import { CreateProductInput, IProductRepository } from '../../../domain/ports/product-repository.port';
import { Product } from '../../../domain/entities/product.entity';
import { InvalidPriceError } from '../../../domain/errors/invalid-price.error';
import { InvalidQuantityError } from '../../../domain/errors/invalid-quantity.error';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  execute(command: CreateProductInput): Promise<Product> {
    if (command.price < 0) {
      throw new InvalidPriceError(command.price);
    }

    if (command.quantity < 0) {
      throw new InvalidQuantityError(command.quantity);
    }

    return this.productRepository.create(command);
  }
}
