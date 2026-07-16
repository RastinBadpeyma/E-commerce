export class UnauthorizedAccessError extends Error {
  constructor(message = 'Unauthorized') {
    super(message);
    this.name = 'UnauthorizedAccessError';
  }
}