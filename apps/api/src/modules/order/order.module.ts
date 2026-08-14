import { Module } from '@nestjs/common';
import { PRODUCT_QUERY_PORT } from './core/application/ports/outbound/product-query';
import { ProductInternalAdapter } from './adapters/driven/product/product-adapter';
import { OrderController } from './adapters/driving/order.controller';
import { CreateOrderUseCase } from './core/application/use-cases/create-order/create-order.usecase';
import { AuthModule } from 'src/infrastructure/auth/auth.module';
import { PrismaOrderRepository } from './adapters/driven/prisma/prisma-order.repository';
import { ProductModule } from '../product/product.module';


@Module({
  imports: [AuthModule,ProductModule],
  providers: [
    CreateOrderUseCase,

    {
      provide: PRODUCT_QUERY_PORT,
      useClass: ProductInternalAdapter
    },
    {
      provide: 'OrderRepository',
      useClass: PrismaOrderRepository,
    }
  ],
  controllers: [OrderController],
})
export class OrderModule {}
