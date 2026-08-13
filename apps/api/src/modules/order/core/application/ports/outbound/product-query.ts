import { ProductReference } from "../../../domain/value-object/product-snapshot";

export const PRODUCT_QUERY_PORT = Symbol('PRODUCT_QUERY_PORT');

export interface ProductQueryPort {
  getProductsByIds(productIds: string[]): Promise<ProductReference[] | null>;
}