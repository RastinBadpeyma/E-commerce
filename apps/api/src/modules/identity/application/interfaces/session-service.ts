export interface SessionService {
  create(userId: string): Promise<{ accessToken: string; refreshToken: string }>;
}