import { RefreshToken } from "../entities/refresh-token";

export interface IRefreshTokenRepository {
  create(data: {
    userId: string;
    tokenHash: string;
    expiresAt: Date;
  }): Promise<void>;

  revoke(
     id:string,
     revokedAt: Date | null,
  ):Promise<void>;

  findByHash(hash: string): Promise<RefreshToken | null>;

}