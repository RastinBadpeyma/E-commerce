export interface ReserveStockCommand {
  productId: string;
  quantity: number;
  reservationDurationMinutes: number;
}

export interface ReserveStockResult {
  reservationId: string;
  productId: string;
  quantity: number;
  expiresAt: Date;
}

