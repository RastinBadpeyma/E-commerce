import { Product } from "../../domain/entities/product.entity";
import { CreateProductInput } from "../inbound/create-product";
import { FindProductsInput, PaginatedProducts } from "../inbound/find-products";

export interface IProductRepository {
  create(command: CreateProductInput): Promise<Product>;
  findMany(input?: FindProductsInput): Promise<PaginatedProducts>;
  findBySlug(slug: string): Promise<Product | null>;
}
