export interface TokenService {
  generateAccessToken(userId: string): Promise<string>;

  generateRefreshToken(): Promise<string>;
}