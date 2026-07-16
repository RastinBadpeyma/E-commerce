export class InvalidOtpError extends Error {
  constructor(reason: 'expired' | 'used' | 'invalid') {
    super(`Invalid OTP: ${reason}`);
    this.name = 'InvalidOtpError';
  }
}