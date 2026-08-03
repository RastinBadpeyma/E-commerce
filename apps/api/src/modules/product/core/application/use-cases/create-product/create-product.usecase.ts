import { Inject, Injectable } from '@nestjs/common';
import { Product } from '../../../domain/entities/product.entity';
import { InvalidPriceError } from '../../../domain/errors/invalid-price.error';
import { InvalidQuantityError } from '../../../domain/errors/invalid-quantity.error';
import { IProductRepository } from '../../../ports/outbound/product-repository.port';
import { CreateProductInput } from '../../../ports/inbound/create-product';
import { CreateProduct } from '../../../ports/outbound/create-product.input';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  execute(input: CreateProductInput): Promise<Product> {
    if (input.price < 0) {
      throw new InvalidPriceError(input.price);
    }

    if (input.quantity < 0) {
      throw new InvalidQuantityError(input.quantity);
    }

    const result : CreateProduct={
      title: input.title,
      slug: input.slug,
      description: input.description,
      price: input.price,
      quantity: input.quantity,
    }


    return this.productRepository.save(result);
  }
}
