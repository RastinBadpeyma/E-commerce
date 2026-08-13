import { Module } from '@nestjs/common';
import { ProductController } from './adapters/driving/rest/product.controller';
import { PrismaProductRepository } from './adapters/driven/prisma/prisma-product.repository';
import { CreateProductUseCase } from './core/application/use-cases/create-product/create-product.usecase';
import { GetProductsUseCase } from './core/application/use-cases/find-products/get-products.usecase';
import { GetProductBySlugUseCase } from './core/application/use-cases/get-product-by-slug/get-product-by-slug.usecase';
import { AuthModule } from '../../infrastructure/auth/auth.module';
import { ProductPublicApi } from './core/application/product-public-api';
import { PRODUCT_PUBLIC } from './core/ports/inbound/product-public';

@Module({
  imports: [AuthModule],
  controllers: [ProductController],
  providers: [
    CreateProductUseCase,
    GetProductsUseCase,
    GetProductBySlugUseCase,
    {
      provide: 'IProductRepository',
      useClass: PrismaProductRepository,
    },
    {
      provide: PRODUCT_PUBLIC,
      useClass: ProductPublicApi
    }
  ],
  exports:[PRODUCT_PUBLIC]
})
export class ProductModule {}
