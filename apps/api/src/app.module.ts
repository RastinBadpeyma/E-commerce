import { Module } from '@nestjs/common';
import { IdentityModule } from './modules/identity/identity.module';
import { PrismaModule } from './infrastructure/database/prisma.module';

@Module({
  imports: [
    PrismaModule,
    IdentityModule,
  ],
})
export class AppModule {}
