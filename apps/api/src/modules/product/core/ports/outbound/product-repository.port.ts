import { Product, ProductStatus } from "../../domain/entities/product.entity";
import { CreateProduct } from "./create-product.input";
import { FindProducts, PaginatedProducts } from "./find-product.input";

export type ProductSnapshot = {
    productId: string;
    ProductName: string;
    Unitprice: number;
    status: ProductStatus;
};

export interface IProductRepository {
  save(command: CreateProduct): Promise<Product>;
  findMany(input?: FindProducts): Promise<PaginatedProducts>;
  findByIds(ids: string[]): Promise<ProductSnapshot[]>;
  findBySlug(slug: string): Promise<Product | null>;
}
