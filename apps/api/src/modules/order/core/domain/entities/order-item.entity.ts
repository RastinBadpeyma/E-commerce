import { InvalidOrderItemError } from '../errors/invalid-order-item.error';

export interface CreateOrderItemProps {
  id: string;
  productId: string;
  quantity: number;
  unitPrice: number;
}

export class OrderItem {
  private readonly _id: string;
  private readonly _productId: string;
  private readonly _quantity: number;
  private readonly _unitPrice: number;
  private readonly _totalPrice: number;

  private constructor(props: CreateOrderItemProps) {
    if (!Number.isInteger(props.quantity) || props.quantity <= 0) {
      throw new InvalidOrderItemError(
        'Order item quantity must be a positive integer',
      );
    }

    if (!Number.isFinite(props.unitPrice) || props.unitPrice < 0) {
      throw new InvalidOrderItemError(
        'Order item unit price must be a valid non-negative number',
      );
    }

    this._id = props.id;
    this._productId = props.productId;
    this._quantity = props.quantity;
    this._unitPrice = props.unitPrice;
    this._totalPrice = props.unitPrice * props.quantity;
  }

  static create(props: CreateOrderItemProps): OrderItem {
    return new OrderItem(props);
  }

  static rehydrate(props: CreateOrderItemProps): OrderItem {
    return new OrderItem(props);
  }

  get id(): string {
    return this._id;
  }

  get productId(): string {
    return this._productId;
  }

  get quantity(): number {
    return this._quantity;
  }

  get unitPrice(): number {
    return this._unitPrice;
  }

  get totalPrice(): number {
    return this._totalPrice;
  }
  
}