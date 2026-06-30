import { RefreshToken } from "../entities/refresh-token";

export interface IRefreshTokenRepository {
  create(data: {
    userId: string;
    tokenHash: string;
    expiresAt: Date;
  }): Promise<void>;

  save(
     token:RefreshToken
  ):Promise<void>;

  findByHash(hash: string): Promise<RefreshToken | null>;

}