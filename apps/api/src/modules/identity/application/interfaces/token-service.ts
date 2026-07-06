export interface ITokenService {
  generateAccessToken(userId: string): Promise<string>;

  generateRefreshToken(): Promise<string>;
}