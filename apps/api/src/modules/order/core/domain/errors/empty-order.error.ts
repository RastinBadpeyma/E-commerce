export class EmptyOrderError extends Error {
  constructor() {
    super('Order must contain at least one item');
    this.name = 'EmptyOrderError';
  }
}