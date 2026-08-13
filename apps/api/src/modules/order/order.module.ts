import { Module } from '@nestjs/common';
import { PRODUCT_QUERY_PORT } from './core/application/outbound/product-query';
import { ProductInternalAdapter } from './adapters/driven/product/product-adapter';


@Module({
  imports: [],
  controllers: [],
  providers: [

    {
      provide: PRODUCT_QUERY_PORT,
      useClass: ProductInternalAdapter
    }
  ],
})
export class OrderModule {}
