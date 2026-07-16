export class OtpNotFoundError extends Error {
  constructor() {
    super('OTP not found');
    this.name = 'OtpNotFoundError';
  }
}