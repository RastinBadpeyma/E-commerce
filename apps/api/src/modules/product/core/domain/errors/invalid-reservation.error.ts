export class InvalidReservationError extends Error {
  constructor(message: string) {
    super(message);

    this.name = 'InvalidReservationError';
  }
}