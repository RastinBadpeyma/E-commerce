export interface ReserveStockResult {
  reservationId: string;
  productId: string;
  quantity: number;
  expiresAt: Date;
}

export interface ReserveStockItemCommand {
  productId: string;
  quantity: number;
}

export interface ReserveStockItemsResult {
  reservationIds: string[];
}

export interface StockReservationService {
  reserveItems(
    items: ReserveStockItemCommand[],
    expiresAt: Date,
  ): Promise<ReserveStockItemsResult>;
}