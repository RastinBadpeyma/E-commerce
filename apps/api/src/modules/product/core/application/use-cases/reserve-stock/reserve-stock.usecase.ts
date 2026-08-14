import { Injectable, Inject } from "@nestjs/common";
import { randomUUID } from "crypto";
import { StockReservation } from "../../../domain/entities/stock-reservation.entity";
import { InsufficientStockError } from "../../../domain/errors/insufficient-stock.error";
import { ReserveStockCommand, ReserveStockResult } from "../../../ports/inbound/reserve-stock.usecase";
import { StockRepository } from "../../../ports/outbound/stock-repository.port";
import { StockReservationRepository } from "../../../ports/outbound/stock-reservation-repository";
import { StockReservationService } from "../../../ports/outbound/stock-reservation-service.port";


@Injectable()
export class ReserveStockUseCase {
  constructor(
    @Inject('STOCK_REPOSITORY')
    // private readonly stockRepository: StockRepository,

    // @Inject('STOCK_RESERVATION_REPOSITORY')
    // private readonly reservationRepository: StockReservationRepository,

     @Inject('STOCK_RESERVATION_SERVICE')
    private readonly reservationService:StockReservationService,
  ) {}

//   async execute(
//     command: ReserveStockCommand,
//   ): Promise<ReserveStockResult> {
//     const stock =
//       await this.stockRepository.findByProductId(
//         command.productId,
//       );

//     if (!stock) {
//       throw new Error(
//         `Stock not found for product ${command.productId}`,
//       );
//     }

//     const reservedQuantity =
//       await this.stockRepository.getReservedQuantity(
//         command.productId,
//       );

//     const availableQuantity =
//       stock.quantity - reservedQuantity;

//     if (
//       availableQuantity <
//       command.quantity
//     ) {
//       throw new InsufficientStockError(
//         command.productId,
//         command.quantity,
//         availableQuantity,
//       );
//     }

//     const expiresAt =
//       new Date(
//         Date.now() +
//           command.reservationDurationMinutes *
//             60 *
//             1000,
//       );

//     const reservation =
//       StockReservation.create({
//         id: randomUUID(),
//         productId: command.productId,
//         quantity: command.quantity,
//         expiresAt,
//       });

//     await this.reservationRepository.create(
//       reservation,
//     );

//     return {
//       reservationId: reservation.id,
//       productId: reservation.productId,
//       quantity: reservation.quantity,
//       expiresAt: reservation.expiresAt,
//     };
//   }
async execute(
    command: ReserveStockCommand,
  ): Promise<ReserveStockResult> {
    const expiresAt =
      new Date(
        Date.now() +
          command.reservationDurationMinutes *
            60 *
            1000,
      );

    return this.reservationService.reserve(
      command.productId,
      command.quantity,
      expiresAt,
    );
  }
}
