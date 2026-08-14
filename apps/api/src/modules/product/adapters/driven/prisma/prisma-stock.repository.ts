import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { Stock } from 'src/modules/product/core/domain/entities/stock.entity';
import { StockRepository } from 'src/modules/product/core/ports/outbound/stock-repository.port';



@Injectable()
export class PrismaStockRepository
  implements StockRepository
{
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findByProductId(
    productId: string,
  ): Promise<Stock | null> {
    const record =
      await this.prisma.stock.findUnique({
        where: {
          productId,
        },
      });

    if (!record) {
      return null;
    }

    return Stock.create({
      id: record.id,
      productId: record.productId,
      quantity: record.quantity,
    });
  }

  async getReservedQuantity(
    productId: string,
  ): Promise<number> {
    const result =
      await this.prisma.stockReservation.aggregate({
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

    return result._sum.quantity ?? 0;
  }
}