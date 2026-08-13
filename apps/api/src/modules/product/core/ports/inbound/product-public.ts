import { ProductStatus } from "../../domain/entities/product.entity";

export const PRODUCT_PUBLIC =  Symbol('PRODUCT_PUBLIC')

export type ProductSnapshot = {
    productId: string;
    ProductName: string;
    Unitprice: number;
    status: ProductStatus;
};



export interface ProductPublic {
  findProductId(productId: string): Promise<ProductSnapshot | null>;
}