export class RefreshToken {
  constructor(
    public readonly id: string,
    public tokenHash: string,
    public userId: string,
    public expiresAt: Date,
    public revokedAt: Date | null,
    public createdAt: Date

  ) {}

  revoke(){
    if (this.revokedAt) return;
    this.revokedAt = new Date();
  }

  isRevoked(){
    return !!this.revokedAt;
  }

  isExpired(){
     return this.expiresAt < new Date();
  }
}
