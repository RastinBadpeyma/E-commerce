import { AuthPayload } from '@ecommerce/auth-contracts';

export const ITokenVerifier = Symbol('ITokenVerifier');

export interface ITokenVerifier {
  verify(token: string): Promise<AuthPayload>;
}
