export class InvalidQuantityError extends Error {
  constructor(quantity: number) {
    super(`Invalid product quantity: ${quantity}. Quantity must be greater than or equal to 0.`);
    this.name = 'InvalidQuantityError';
  }
}
