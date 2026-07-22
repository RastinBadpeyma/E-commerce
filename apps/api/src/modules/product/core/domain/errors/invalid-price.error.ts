export class InvalidPriceError extends Error {
  constructor(price: number) {
    super(`Invalid product price: ${price}. Price must be greater than or equal to 0.`);
    this.name = 'InvalidPriceError';
  }
}
