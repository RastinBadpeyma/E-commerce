import { StockReservation } from "../../domain/entities/stock-reservation.entity";

export interface StockReservationRepository {
  create(
    reservation: StockReservation,
  ): Promise<void>;

  findById(
    id: string,
  ): Promise<StockReservation | null>;

  findActiveByProductId(
    productId: string,
  ): Promise<StockReservation[]>;

  update(
    reservation: StockReservation,
  ): Promise<void>;
}