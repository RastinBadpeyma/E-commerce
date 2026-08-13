export class ProductNotOrderableError extends Error {
  constructor(productId: string) {
    super(`Product ${productId} is not available for ordering`);
    this.name = 'ProductNotOrderableError';
  }
}