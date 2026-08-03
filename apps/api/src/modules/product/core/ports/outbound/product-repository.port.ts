import { Product } from "../../domain/entities/product.entity";
import { CreateProduct } from "./create-product.input";
import { FindProducts, PaginatedProducts } from "./find-product.input";

export interface IProductRepository {
  save(command: CreateProduct): Promise<Product>;
  findMany(input?: FindProducts): Promise<PaginatedProducts>;
  findBySlug(slug: string): Promise<Product | null>;
}
