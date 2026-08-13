import { randomUUID } from 'crypto';
import { Injectable, Inject  } from '@nestjs/common';
import { OrderItem } from '../../../domain/entities/order-item.entity';
import { Order } from '../../../domain/entities/order.entity';
import { CreateOrderCommand, CreateOrderResult } from '../../ports/inbound/create-order';
import { OrderRepository } from '../../ports/outbound/order-repository';
import { PRODUCT_QUERY_PORT, ProductQueryPort } from '../../ports/outbound/product-query';
import { ProductNotOrderableError } from '../../../domain/errors/product-not-orderable.error';



@Injectable()
export class CreateOrderUseCase  {
  constructor(
    @Inject(PRODUCT_QUERY_PORT)
    private readonly productCatalog: ProductQueryPort,
    @Inject('OrderRepository')
    private readonly orderRepository: OrderRepository,
  ) {}

  async execute(
    command: CreateOrderCommand,
  ): Promise<CreateOrderResult> {
    const normalizedItems = this.normalizeItems(command.items);

    const productIds = normalizedItems.map(
      (item) => item.productId,
    );

    const products = (await this.productCatalog.getProductsByIds(productIds)) ?? [];


    const productsById = new Map(
      products.map((product) => [product.productId, product]),
    );

    const orderItems = normalizedItems.map((item) => {
      const product = productsById.get(item.productId);

      if (!product) {
        throw new ProductNotOrderableError(item.productId);
      }

      if (product.status !== 'ACTIVE') {
        throw new ProductNotOrderableError(product.productId);
      }

      return OrderItem.create({
        id: randomUUID(),
        productId: product.productId,
        quantity: item.quantity,
        unitPrice: product.unitPrice,
      });
    });

    const order = Order.create({
      userId: command.userId,
      items: orderItems,
    });

    await this.orderRepository.create(order);

    return {
      id: order.id,
      userId: order.userId,
      status: order.status,
      totalAmount: order.totalAmount,
      items: order.items.map((item:any) => ({
        id: item.id,
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.totalPrice,
      })),
    };
  }

  private normalizeItems(
    items: CreateOrderCommand['items'],
  ): CreateOrderCommand['items'] {
    const quantities = new Map<string, number>();

    for (const item of items) {
      if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
        throw new Error(
          'Quantity must be a positive integer',
        );
      }

      quantities.set(
        item.productId,
        (quantities.get(item.productId) ?? 0) + item.quantity,
      );
    }

    return Array.from(quantities.entries()).map(
      ([productId, quantity]) => ({
        productId,
        quantity,
      }),
    );
  }
}


