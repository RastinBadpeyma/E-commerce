import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { TransactionContext, TransactionManager } from 'src/modules/product/core/ports/outbound/transaction-manager';




@Injectable()
export class PrismaTransactionManager
  implements TransactionManager
{
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async execute<T>(
    callback: (
      context: TransactionContext,
    ) => Promise<T>,
  ): Promise<T> {
    return this.prisma.$transaction(
      async (tx) => {
        return callback({
          client: tx,
        });
      },
    );
  }
}