import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './presentation/auth.controller';
import { RequestOtpUseCase } from './application/use-cases/request-otp/request-otp.use-case';
import { PrismaOtpRepositories } from './infrastructure/repositories/prisma-request-otp.repositories';
import { VerifyOtpUseCase } from './application/use-cases/verify-otp/verify-otp.use-case';
import { PrismaUserRepositories } from './infrastructure/repositories/prisma-user.repositories';
import { PrismaRefreshTokenRepositories } from './infrastructure/repositories/prisma-refresh-token.repositories';
import { JwtTokenService } from './infrastructure/services/jwt.service';
import { HashService } from './infrastructure/services/hash.service';
import { RefreshTokenUseCase } from './application/use-cases/refresh-token/refresh-token.use-case';


@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: "15m"
      }
    }),
  ],


  providers: [
    RequestOtpUseCase,
    VerifyOtpUseCase,
    RefreshTokenUseCase,
    {
      provide: 'IOtpRepository',
      useClass: PrismaOtpRepositories,
    },
    {
      provide: 'IUserRepository',
      useClass: PrismaUserRepositories,
    },
    {
      provide: 'IRefreshTokenRepository',
      useClass: PrismaRefreshTokenRepositories,
    },
    {
      provide: 'TokenService',
      useClass: JwtTokenService,
    },
    {
      provide: 'IHashService',
      useClass: HashService,
    },
  ],

  controllers: [AuthController],
  exports: [],
})
export class IdentityModule {}
