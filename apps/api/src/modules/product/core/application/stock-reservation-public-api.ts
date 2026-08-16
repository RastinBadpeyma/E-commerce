import { Inject, Injectable } from '@nestjs/common';
import {
  ReserveItemsCommand,
  ReserveItemsResult,
  StockReservationPublic,
} from '../ports/inbound/stock-reservation-public';
import {
  StockReservationService,
} from '../ports/outbound/stock-reservation-service.port';
import {
  StockReservationRepository,
} from '../ports/outbound/stock-reservation-repository';

@Injectable()
export class StockReservationPublicApi
  implements StockReservationPublic
{
  constructor(
    @Inject('STOCK_RESERVATION_SERVICE')
    private readonly reservationService: StockReservationService,
    @Inject('STOCK_RESERVATION_REPOSITORY')
    private readonly reservationRepository: StockReservationRepository,
  ) {}

  async reserveItems(
    command: ReserveItemsCommand,
  ): Promise<ReserveItemsResult> {
    const expiresAt = new Date();
    expiresAt.setMinutes(
      expiresAt.getMinutes() + command.reservationDurationMinutes,
    );

    const result = await this.reservationService.reserveItems(
      command.items,
      expiresAt,
    );

    return { reservationIds: result.reservationIds };
  }

  async release(
    reservationIds: string[],
  ): Promise<void> {
    const reservations =
      await this.reservationRepository.findByIds(reservationIds);

    for (const reservation of reservations) {
      reservation.release();
      await this.reservationRepository.update(reservation);
    }
  }

  async linkToOrder(
    reservationIds: string[],
    orderId: string,
  ): Promise<void> {
    const reservations =
      await this.reservationRepository.findByIds(reservationIds);

    for (const reservation of reservations) {
      reservation.linkToOrder(orderId);
      await this.reservationRepository.update(reservation);
    }
  }

  async consume(
    reservationIds: string[],
  ): Promise<void> {
    const reservations =
      await this.reservationRepository.findByIds(reservationIds);

    for (const reservation of reservations) {
      reservation.consume();
      await this.reservationRepository.update(reservation);
    }
  }

  async findByOrderId(
    orderId: string,
  ): Promise<string[]> {
    const reservations =
      await this.reservationRepository.findByOrderId(orderId);

    return reservations
      .filter((r) => r.isActive())
      .map((r) => r.id);
  }
}
