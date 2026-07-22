import { Module } from '@nestjs/common';
import { IdentityModule } from './modules/identity/identity.module';
import { PrismaModule } from './infrastructure/database/prisma.module';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [
    PrismaModule,
    IdentityModule,
    ProductModule,
  ],
})
export class AppModule {}
