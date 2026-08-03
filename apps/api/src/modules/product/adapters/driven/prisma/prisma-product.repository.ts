import { Injectable } from "@nestjs/common";
import { Prisma } from "generated/prisma/client";
import { PrismaService } from "src/infrastructure/database/prisma.service";
import { Product } from "src/modules/product/core/domain/entities/product.entity";

import { SlugAlreadyExistsError } from "src/modules/product/core/domain/errors/slug-already-exists.error";
import { PaginatedProducts } from "src/modules/product/core/ports/outbound/find-product.input";
import { CreateProduct } from "src/modules/product/core/ports/outbound/create-product.input";
import { FindProducts } from "src/modules/product/core/ports/outbound/find-product.input";
import { IProductRepository } from "src/modules/product/core/ports/outbound/product-repository.port";

@Injectable()
export class PrismaProductRepository implements IProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findBySlug(slug: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: { slug },
    });

   return product ? this.toDomain(product) : null;
  }

  async findMany(input: FindProducts = {}): Promise<PaginatedProducts> {
    const limit = input.limit ?? 20;

    let cursorCondition: Prisma.ProductWhereInput | undefined;
    if (input.cursor) {
      const { createdAt, id } = this.decodeCursor(input.cursor);
      cursorCondition = {
        OR: [{ createdAt: { gt: createdAt } }, { createdAt, id: { gt: id } }],
      };
    }

    const prismaProducts = await this.prisma.product.findMany({
      where: cursorCondition,
      orderBy: [{ createdAt: "asc" }, { id: "asc" }],
      take: limit + 1, 
    });

    const hasMore = prismaProducts.length > limit;
    const items = prismaProducts.slice(0, limit).map((p) => this.toDomain(p));
    const nextCursor = hasMore
      ? this.encodeCursor(items[items.length - 1])
      : null;

    return { items, nextCursor, hasMore };
  }

  private encodeCursor(product: Product): string {
    return Buffer.from(
      JSON.stringify({
        createdAt: product.createdAt, 
        id: product._id,
      }),
    ).toString("base64");
  }

  private decodeCursor(cursor: string): { createdAt: Date; id: string } {
    return JSON.parse(Buffer.from(cursor, "base64").toString());
  }

  async save(input: CreateProduct): Promise<Product> {
    try {
      const product = await this.prisma.product.create({
        data: {
           title: input.title,
           slug: input.slug,
           description: input.description,
           price: input.price,
           quantity: input.quantity,
        }
      });
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
      product.createdAt,
      product.updatedAt
    );
  }
}
