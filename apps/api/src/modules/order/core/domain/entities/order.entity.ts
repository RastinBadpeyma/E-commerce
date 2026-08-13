import { randomUUID } from 'crypto';

import { EmptyOrderError } from '../errors/empty-order.error';
import { OrderStatus } from '../enums/order-status.enum';
import { OrderItem } from './order-item.entity';

export interface CreateOrderProps {
  id?: string;
  userId: string;
  items: OrderItem[];
}

export class Order {
  private readonly _id: string;
  private readonly _userId: string;
  private _status: OrderStatus;
  private readonly _items: OrderItem[];
  private readonly _totalAmount: number;

  private constructor(props: {
    id: string;
    userId: string;
    status: OrderStatus;
    items: OrderItem[];
    totalAmount: number;
  }) {
    this._id = props.id;
    this._userId = props.userId;
    this._status = props.status;
    this._items = props.items;
    this._totalAmount = props.totalAmount;
  }

  static create(props: CreateOrderProps): Order {
    if (props.items.length === 0) {
      throw new EmptyOrderError();
    }

    const totalAmount = props.items.reduce(
      (total, item) => total + item.totalPrice,
      0,
    );

    return new Order({
      id: props.id ?? randomUUID(),
      userId: props.userId,
      status: OrderStatus.PENDING,
      items: props.items,
      totalAmount,
    });
  }

  static rehydrate(props: {
  id: string;
  userId: string;
  status: OrderStatus;
  totalAmount: number;
  items: {
    id: string;
    productId: string;
    quantity: number;
    unitPrice: number;
  }[];
}): Order {
  const items = props.items.map((item) =>
    OrderItem.rehydrate(item),
  );

  return new Order({
    id: props.id,
    userId: props.userId,
    status: props.status,
    items,
    totalAmount: props.totalAmount,
  });
 }

  get id(): string {
    return this._id;
  }

  get userId(): string {
    return this._userId;
  }

  get status(): OrderStatus {
    return this._status;
  }

  get items(): readonly OrderItem[] {
    return this._items;
  }

  get totalAmount(): number {
    return this._totalAmount;
  }
}