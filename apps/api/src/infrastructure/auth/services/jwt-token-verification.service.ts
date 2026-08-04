import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthPayload } from '@ecommerce/auth-contracts';
import { ITokenVerifier } from './token-verifier.interface';

@Injectable()
export class JwtTokenVerificationService implements ITokenVerifier {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  async verify(token: string): Promise<AuthPayload> {
    try {
      const payload = await this.jwtService.verifyAsync<AuthPayload>(token);
      return payload;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
