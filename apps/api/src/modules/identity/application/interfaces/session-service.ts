export interface ISessionService {
  create(userId: string): Promise<{ accessToken: string; refreshToken: string, tokenHash: string, expiresAt: Date }>;
}