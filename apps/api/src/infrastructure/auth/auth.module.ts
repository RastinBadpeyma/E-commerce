import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { JwtTokenVerificationService } from './services/jwt-token-verification.service';
import { ITokenVerifier } from './services/token-verifier.interface';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  providers: [
    JwtAuthGuard,
    RolesGuard,
    {
      provide: ITokenVerifier,
      useClass: JwtTokenVerificationService,
    },
  ],
  exports: [
    JwtAuthGuard,
    RolesGuard,
    ITokenVerifier,
  ],
})
export class AuthModule {}
