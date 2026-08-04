import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { AuthPayload } from '@ecommerce/auth-contracts';
import { ITokenVerifier } from '../services/token-verifier.interface';

interface AuthenticatedRequest extends Request {
  user: AuthPayload;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject(ITokenVerifier)
    private readonly tokenVerifier: ITokenVerifier,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = this.extractBearerToken(request);

    if (!token) {
      throw new UnauthorizedException('Missing or invalid authorization header');
    }

    const payload = await this.tokenVerifier.verify(token);
    request.user = payload;

    return true;
  }

  private extractBearerToken(request: Request): string | null {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    return authHeader.slice(7);
  }
}
