export class InsufficientStockError extends Error {
  constructor(
    public readonly productId: string,
    public readonly requested: number,
    public readonly available: number,
  ) {
    super(
      `Insufficient stock for product ${productId}`,
    );

    this.name = 'InsufficientStockError';
  }
}