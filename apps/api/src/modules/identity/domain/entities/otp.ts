export class Otp {
  constructor(
    public readonly id: string,
    public phoneNumber: string,
    public code: string,
    public expiresAt: Date,
    public usedAt: Date,
    public createdAt: Date,

  ) {}
}