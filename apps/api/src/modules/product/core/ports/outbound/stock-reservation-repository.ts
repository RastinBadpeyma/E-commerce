import { StockReservation } from "../../domain/entities/stock-reservation.entity";

export interface StockReservationRepository {
  create(
    reservation: StockReservation,
  ): Promise<void>;

  findById(
    id: string,
  ): Promise<StockReservation | null>;

  findByIds(
    ids: string[],
  ): Promise<StockReservation[]>;

  findActiveByProductId(
    productId: string,
  ): Promise<StockReservation[]>;

  findExpiredActive(
    now: Date,
  ): Promise<StockReservation[]>;

  findByOrderId(
    orderId: string,
  ): Promise<StockReservation[]>;

  update(
    reservation: StockReservation,
  ): Promise<void>;
}