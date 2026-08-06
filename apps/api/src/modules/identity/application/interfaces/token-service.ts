import { AuthPayload } from '@ecommerce/auth-contracts';

export interface ITokenService {
  generateAccessToken(payload: AuthPayload): Promise<string>;
  generateRefreshToken(): Promise<string>;
}
