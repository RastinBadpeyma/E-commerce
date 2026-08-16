import { StockReservationStatus } from "../enums/stock-reservation.enum";

export interface StockReservationProps {
  id: string;
  productId: string;
  quantity: number;
  status: StockReservationStatus;
  expiresAt: Date;
  orderId?: string;
}

export class StockReservation {
  private constructor(
    private readonly props: StockReservationProps,
  ) {}

  static create(
    props: Omit<
      StockReservationProps,
      'status'
    >,
  ): StockReservation {
    if (props.quantity <= 0) {
      throw new Error(
        'Reservation quantity must be greater than zero',
      );
    }

    if (
      props.expiresAt.getTime() <=
      Date.now()
    ) {
      throw new Error(
        'Reservation expiration must be in the future',
      );
    }

    return new StockReservation({
      ...props,
      status:
        StockReservationStatus.ACTIVE,
    });
  }

  static createFromPersistence(
   props: StockReservationProps,
 ): StockReservation {
   return new StockReservation(props);
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

  get status(): StockReservationStatus {
    return this.props.status;
  }

  get expiresAt(): Date {
    return this.props.expiresAt;
  }

  get orderId(): string | undefined {
    return this.props.orderId;
  }

  get isLinkedToOrder(): boolean {
    return this.props.orderId !== undefined;
  }

  linkToOrder(orderId: string): void {
    if (
      this.props.status !==
      StockReservationStatus.ACTIVE
    ) {
      throw new Error(
        'Only active reservations can be linked to an order',
      );
    }

    this.props.orderId = orderId;
  }

  isActive(now = new Date()): boolean {
    return (
      this.props.status ===
        StockReservationStatus.ACTIVE &&
      this.props.expiresAt > now
    );
  }

  release(): void {
    if (
      this.props.status !==
      StockReservationStatus.ACTIVE
    ) {
      throw new Error(
        'Only active reservations can be released',
      );
    }

    this.props.status =
      StockReservationStatus.RELEASED;
  }

  expire(now = new Date()): void {
    if (
      this.props.status !==
      StockReservationStatus.ACTIVE
    ) {
      throw new Error(
        'Only active reservations can expire',
      );
    }

    if (this.props.expiresAt > now) {
      throw new Error(
        'Reservation has not expired yet',
      );
    }

    this.props.status =
      StockReservationStatus.EXPIRED;
  }

  consume(): void {
    if (
      this.props.status !==
      StockReservationStatus.ACTIVE
    ) {
      throw new Error(
        'Only active reservations can be consumed',
      );
    }

    this.props.status =
      StockReservationStatus.CONSUMED;
  }
}