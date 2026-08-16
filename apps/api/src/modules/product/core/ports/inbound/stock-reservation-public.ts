export const STOCK_RESERVATION_PUBLIC = Symbol(
  'STOCK_RESERVATION_PUBLIC',
);

export interface ReserveItemsCommand {
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  reservationDurationMinutes: number;
}

export interface ReserveItemsResult {
  reservationIds: string[];
}

export interface StockReservationPublic {
  reserveItems(
    command: ReserveItemsCommand,
  ): Promise<ReserveItemsResult>;

  release(
    reservationIds: string[],
  ): Promise<void>;

  linkToOrder(
    reservationIds: string[],
    orderId: string,
  ): Promise<void>;

  consume(
    reservationIds: string[],
  ): Promise<void>;

  findByOrderId(
    orderId: string,
  ): Promise<string[]>;
}
