import { Injectable } from "@nestjs/common";
import { Prisma } from "generated/prisma/client";
import { PrismaService } from "src/infrastructure/database/prisma.service";
import { Product } from "src/modules/product/core/domain/entities/product.entity";
import {
  CreateProductInput,
  IProductRepository,
} from "src/modules/product/core/domain/ports/product-repository.port";
import { SlugAlreadyExistsError } from "src/modules/product/core/domain/errors/slug-already-exists.error";

@Injectable()
export class PrismaProductRepository implements IProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: CreateProductInput): Promise<Product> {
    try {
      const product = await this.prisma.product.create({ data: input });
      return this.toDomain(product);
    } catch (error: any) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new SlugAlreadyExistsError(input.slug);
        }
      }
      throw error;
    }
  }

  private toDomain(product: {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    price: Prisma.Decimal;
    quantity: number;
    status: any;
    createdAt: Date;
    updatedAt: Date;
  }): Product {
    return new Product(
      product.id,
      product.title,
      product.slug,
      product.description || "",
      Number(product.price),
      product.quantity,
      product.status,
    );
  }
}
