import { Stock } from "../../domain/entities/stock.entity";


export interface StockRepository {
  findByProductId(
    productId: string,
  ): Promise<Stock | null>;

  getReservedQuantity(
    productId: string,
  ): Promise<number>;
}