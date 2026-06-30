import { RefreshToken } from "../entities/refresh-token";

export interface IRefreshTokenRepository {
  create(data: {
    userId: string;
    tokenHash: string;
    expiresAt: Date;
  }): Promise<void>;

  findByHash(hash: string): Promise<RefreshToken | null>;

  revoke(id: string): Promise<void>;
}