import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { OrderRepository } from 'src/modules/order/core/application/ports/outbound/order-repository';
import { Order } from 'src/modules/order/core/domain/entities/order.entity';
import { OrderStatus } from 'src/modules/order/core/domain/enums/order-status.enum';



@Injectable()
export class PrismaOrderRepository implements OrderRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(order: Order): Promise<void> {
    await this.prisma.order.create({
      data: {
        id: order.id,
        userId: order.userId,
        status: order.status,
        totalAmount: order.totalAmount,

        items: {
          create: order.items.map((item) => ({
            id: item.id,
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: item.totalPrice,
          })),
        },
      },
    });
  }

  async findById(id: string): Promise<Order | null> {
    const record = await this.prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        items: true,
      },
    });

    if (!record) {
      return null;
    }

    return Order.rehydrate({
      id: record.id,
      userId: record.userId,
      status: record.status as OrderStatus,
      totalAmount: Number(record.totalAmount),
      items: record.items.map((item) => ({
        id: item.id,
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: Number(item.unitPrice),
      })),
    });
  }
}