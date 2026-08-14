import { Module } from '@nestjs/common';
import { ProductController } from './adapters/driving/rest/product.controller';
import { PrismaProductRepository } from './adapters/driven/prisma/prisma-product.repository';
import { CreateProductUseCase } from './core/application/use-cases/create-product/create-product.usecase';
import { GetProductsUseCase } from './core/application/use-cases/find-products/get-products.usecase';
import { GetProductBySlugUseCase } from './core/application/use-cases/get-product-by-slug/get-product-by-slug.usecase';
import { AuthModule } from '../../infrastructure/auth/auth.module';
import { ProductPublicApi } from './core/application/product-public-api';
import { PRODUCT_PUBLIC } from './core/ports/inbound/product-public';
import { ReserveStockUseCase } from './core/application/use-cases/reserve-stock/reserve-stock.usecase';
import { PrismaStockRepository } from './adapters/driven/prisma/prisma-stock.repository';
import { PrismaStockReservationRepository } from './adapters/driven/prisma/prisma-stock-reservation.repository';
import { PrismaTransactionManager } from './adapters/driven/prisma/prisma-transaction-manager';
import { PrismaStockReservationService } from './adapters/driven/prisma/prisma-srock-reservation-reservation.service';

@Module({
  imports: [AuthModule],
  controllers: [ProductController],
  providers: [
    CreateProductUseCase,
    GetProductsUseCase,
    GetProductBySlugUseCase,
    ReserveStockUseCase,
    {
      provide: 'IProductRepository',
      useClass: PrismaProductRepository,
    },
    {
      provide: PRODUCT_PUBLIC,
      useClass: ProductPublicApi
    },
    {
      provide: 'STOCK_REPOSITORY',
      useClass: PrismaStockRepository,
    },
    {
      provide: 'STOCK_RESERVATION_REPOSITORY',
      useClass: PrismaStockReservationRepository,
    },
    // {
    //   provide: 'TRANSACTION_MANAGER',
    //   useClass: PrismaTransactionManager,
    // },
    {
      provide: 'STOCK_RESERVATION_SERVICE',
      useClass: PrismaStockReservationService,
    }


    
    
  ],
  exports:[PRODUCT_PUBLIC]
})
export class ProductModule {}
