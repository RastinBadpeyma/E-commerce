import { Module } from '@nestjs/common';
import { IdentityModule } from './modules/identity/identity.module';
import { PrismaModule } from './infrastructure/database/prisma.module';
import { AuthModule } from './infrastructure/auth/auth.module';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    IdentityModule,
    ProductModule,
  ],
})
export class AppModule {}
