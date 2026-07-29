export class ProductNotFoundError extends Error {
  constructor(slug: string) {
    super(`Product not found for slug: ${slug}`);
    this.name = 'ProductNotFoundError';
  }
}