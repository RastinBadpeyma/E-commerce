import {
  Injectable,
} from '@nestjs/common';

import { randomUUID } from 'crypto';
import { PrismaService } from 'src/infrastructure/database/prisma.service';


@Injectable()
export class PrismaStockReservationService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async reserve(
    productId: string,
    quantity: number,
    expiresAt: Date,
  ) {
    return this.prisma.$transaction(
      async (tx) => {
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
            WHERE "productId" = ${productId}
            FOR UPDATE
          `;

        if (stock.length === 0) {
          throw new Error(
            `Stock not found for product ${productId}`,
          );
        }

        const stockQuantity =
          stock[0].quantity;

        const result =
          await tx.stockReservation.aggregate({
            where: {
              productId,
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
          stockQuantity -
          reservedQuantity;

        if (
          availableQuantity <
          quantity
        ) {
          throw new Error(
            `Insufficient stock`,
          );
        }

        const reservation =
          await tx.stockReservation.create({
            data: {
              id: randomUUID(),
              productId,
              quantity,
              status: 'ACTIVE',
              expiresAt,
            },
          });

        return {
          reservationId: reservation.id,
          productId,
          quantity,
          expiresAt,
        };
      },
    );
  }
}