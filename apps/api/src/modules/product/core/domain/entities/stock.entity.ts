export interface StockProps {
  id: string;
  productId: string;
  quantity: number;
}

export class Stock {
  private constructor(
    private readonly props: StockProps,
  ) {}

  static create(
    props: StockProps,
  ): Stock {
    if (props.quantity < 0) {
      throw new Error(
        'Stock quantity cannot be negative',
      );
    }

    return new Stock(props);
  }

  get id(): string {
    return this.props.id;
  }

  get productId(): string {
    return this.props.productId;
  }

  get quantity(): number {
    return this.props.quantity;
  }
}