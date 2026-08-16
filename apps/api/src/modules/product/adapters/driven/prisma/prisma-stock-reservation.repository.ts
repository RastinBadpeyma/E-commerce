import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/database/prisma.service";
import { StockReservation } from "src/modules/product/core/domain/entities/stock-reservation.entity";
import { StockReservationStatus } from "src/modules/product/core/domain/enums/stock-reservation.enum";
import { StockReservationRepository } from "src/modules/product/core/ports/outbound/stock-reservation-repository";


@Injectable()
export class PrismaStockReservationRepository
  implements StockReservationRepository
{
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    reservation: StockReservation,
  ): Promise<void> {
    await this.prisma.stockReservation.create({
      data: {
        id: reservation.id,
        productId: reservation.productId,
        quantity: reservation.quantity,
        status: reservation.status,
        expiresAt: reservation.expiresAt,
        orderId: reservation.orderId ?? null,
      },
    });
  }

  async findById(
    id: string,
  ): Promise<StockReservation | null> {
    const record =
      await this.prisma.stockReservation.findUnique({
        where: {
          id,
        },
      });

    if (!record) {
      return null;
    }

    return StockReservation.createFromPersistence({
      id: record.id,
      productId: record.productId,
      quantity: record.quantity,
      status:
        record.status as StockReservationStatus,
      expiresAt: record.expiresAt,
      orderId: record.orderId ?? undefined,
    });
  }

  async findByIds(
    ids: string[],
  ): Promise<StockReservation[]> {
    const records =
      await this.prisma.stockReservation.findMany({
        where: {
          id: { in: ids },
        },
      });

    return records.map((record) =>
      StockReservation.createFromPersistence({
        id: record.id,
        productId: record.productId,
        quantity: record.quantity,
        status:
          record.status as StockReservationStatus,
        expiresAt: record.expiresAt,
        orderId: record.orderId ?? undefined,
      }),
    );
  }

  async findActiveByProductId(
    productId: string,
  ): Promise<StockReservation[]> {
    const records =
      await this.prisma.stockReservation.findMany({
        where: {
          productId,
          status: 'ACTIVE',
          expiresAt: {
            gt: new Date(),
          },
        },
      });

    return records.map((record) =>
      StockReservation.createFromPersistence({
        id: record.id,
        productId: record.productId,
        quantity: record.quantity,
        status:
          record.status as StockReservationStatus,
        expiresAt: record.expiresAt,
        orderId: record.orderId ?? undefined,
      }),
    );
  }

  async findExpiredActive(
    now: Date,
  ): Promise<StockReservation[]> {
    const records =
      await this.prisma.stockReservation.findMany({
        where: {
          status: 'ACTIVE',
          expiresAt: {
            lt: now,
          },
        },
      });

    return records.map((record) =>
      StockReservation.createFromPersistence({
        id: record.id,
        productId: record.productId,
        quantity: record.quantity,
        status:
          record.status as StockReservationStatus,
        expiresAt: record.expiresAt,
        orderId: record.orderId ?? undefined,
      }),
    );
  }

  async findByOrderId(
    orderId: string,
  ): Promise<StockReservation[]> {
    const records =
      await this.prisma.stockReservation.findMany({
        where: {
          orderId,
        },
      });

    return records.map((record) =>
      StockReservation.createFromPersistence({
        id: record.id,
        productId: record.productId,
        quantity: record.quantity,
        status:
          record.status as StockReservationStatus,
        expiresAt: record.expiresAt,
        orderId: record.orderId ?? undefined,
      }),
    );
  }

  async update(
    reservation: StockReservation,
  ): Promise<void> {
    await this.prisma.stockReservation.update({
      where: {
        id: reservation.id,
      },
      data: {
        status: reservation.status,
        orderId: reservation.orderId ?? null,
      },
    });
  }
}
