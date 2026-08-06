import { AuthUserRole } from "@ecommerce/auth-contracts";

export interface ISessionService {
  create(userId: string, role?: AuthUserRole): Promise<{ accessToken: string; refreshToken: string, tokenHash: string, expiresAt: Date }>;
}
