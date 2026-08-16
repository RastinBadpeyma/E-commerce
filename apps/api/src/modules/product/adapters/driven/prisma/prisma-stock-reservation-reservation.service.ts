import {
  Injectable,
} from '@nestjs/common';

import { randomUUID } from 'crypto';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import {
  ReserveStockItemCommand,
  ReserveStockItemsResult,
  ReserveStockResult,
} from 'src/modules/product/core/ports/outbound/stock-reservation-service.port';


@Injectable()
export class PrismaStockReservationService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}


  async reserveItems(
    items: ReserveStockItemCommand[],
    expiresAt: Date,
  ): Promise<ReserveStockItemsResult> {
   // Sort by productId to ensure deterministic lock order
    const sortedItems = [...items].sort((a, b) =>
      a.productId.localeCompare(b.productId),
    );

    return this.prisma.$transaction(
      async (tx) => {
        const reservationIds: string[] = [];

        for (const item of sortedItems) {
          const stock =
            await tx.$queryRaw<
              Array<{
                id: string;
                productId: string;
                quantity: number;
              }>
            >`
              SELECT
                id,
                "productId",
                quantity
              FROM product."Stock"
              WHERE "productId" = ${item.productId}
              FOR UPDATE
            `;

          if (stock.length === 0) {
            throw new Error(
              `Stock not found for product ${item.productId}`,
            );
          }

          const stockQuantity =
            stock[0].quantity;

          const result =
            await tx.stockReservation.aggregate({
              where: {
                productId: item.productId,
                status: 'ACTIVE',
                expiresAt: {
                  gt: new Date(),
                },
              },
              _sum: {
                quantity: true,
              },
            });

          const reservedQuantity =
            result._sum.quantity ?? 0;

          const availableQuantity =
            stockQuantity - reservedQuantity;

          if (
            availableQuantity < item.quantity
          ) {
            throw new Error(
              `Insufficient stock for product ${item.productId}: requested ${item.quantity}, available ${availableQuantity}`,
            );
          }

          const reservation =
            await tx.stockReservation.create({
              data: {
                id: randomUUID(),
                productId: item.productId,
                quantity: item.quantity,
                status: 'ACTIVE',
                expiresAt,
              },
            });

          reservationIds.push(reservation.id);
        }

        return { reservationIds };
      },
    );
  }
}
