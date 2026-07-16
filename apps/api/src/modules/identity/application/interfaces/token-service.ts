import { AccessTokenPayload } from "../types/access-token-payload";

export interface ITokenService {
  generateAccessToken(payload: AccessTokenPayload): Promise<string>;

  generateRefreshToken(): Promise<string>;
}