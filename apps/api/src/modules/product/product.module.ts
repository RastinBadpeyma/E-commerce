import { Module } from '@nestjs/common';
import { ProductController } from './adapters/driving/rest/product.controller';
import { PrismaProductRepository } from './adapters/driven/prisma/prisma-product.repository';
import { CreateProductUseCase } from './core/application/use-cases/create-product/create-product.usecase';
import { GetProductsUseCase } from './core/application/use-cases/find-products/get-products.usecase';
import { getProductBySlugUseCase } from './core/application/use-cases/get-product-by-slug/get-product-by-slug.usecase';

@Module({
  controllers: [ProductController],
  providers: [
    CreateProductUseCase,
    GetProductsUseCase,
    getProductBySlugUseCase,
    {
      provide: 'IProductRepository',
      useClass: PrismaProductRepository,
    },
  ],
})
export class ProductModule {}
