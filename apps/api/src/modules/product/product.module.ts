import { Module } from '@nestjs/common';
import { ProductController } from './adapters/driving/rest/product.controller';
import { PrismaProductRepository } from './adapters/driven/prisma/prisma-product.repository';
import { CreateProductUseCase } from './core/application/use-cases/create-product/create-product.usecase';

@Module({
  controllers: [ProductController],
  providers: [
    CreateProductUseCase,
    {
      provide: 'IProductRepository',
      useClass: PrismaProductRepository,
    },
  ],
})
export class ProductModule {}
