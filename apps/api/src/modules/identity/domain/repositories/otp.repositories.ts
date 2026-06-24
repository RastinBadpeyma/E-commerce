import { Otp } from "../entities/otp";

export interface IOtpRepository {
  create(data: {
    phoneNumber: string;
    code: string;
    expiresAt: Date;
  }): Promise<void>;

  findValidOtp(
    phoneNumber: string,
    code: string,
  ): Promise<Otp | null>;

  markAsUsed(id: string): Promise<void>;
}