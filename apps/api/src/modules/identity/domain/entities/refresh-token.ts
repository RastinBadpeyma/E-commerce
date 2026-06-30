import { User } from "./user";

export class RefreshToken {
  constructor(
    public readonly id: string,
    public tokenHash: string,
    public userId: string,
    public user: User,
    public expiresAt: Date,
    public revokedAt: Date | null,
    public createdAt: Date

  ) {}
}
