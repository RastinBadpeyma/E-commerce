import { Module } from '@nestjs/common';
import { AuthController } from './presentation/auth.controller';
import { RequestOtpUseCase } from './application/use-cases/request-otp/request-otp.use-case';
import { PrismaOtpRepositories } from './infrastructure/repositories/prisma-request-otp.repositories';


@Module({
  imports: [],


  providers: [
    RequestOtpUseCase,
    {
      provide: 'IOtpRepository',
      useClass: PrismaOtpRepositories,
    },
  ],

  controllers: [AuthController],
  exports: [],
})
export class IdentityModule {}
