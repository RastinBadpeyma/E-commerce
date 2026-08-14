export interface ReserveStockResult {
  reservationId: string;
  productId: string;
  quantity: number;
  expiresAt: Date;
}

export interface StockReservationService {
  reserve(
    productId: string,
    quantity: number,
    expiresAt: Date,
  ): Promise<ReserveStockResult>;
}