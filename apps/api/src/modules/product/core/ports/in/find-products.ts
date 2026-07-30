import { ProductStatus } from "../../domain/entities/product.entity";

export interface FindProductsInput {
  cursor?: string;      
  limit?: number;        
}
export interface GetProductBySlugOutput {
  title: string;
  description: string;
  price?: number;
  quantity?: number;
  status: ProductStatus;
  updatedAt: Date;
}

export interface FindProductsOutputItem {
  title: string;
  price?: number;
  status: ProductStatus;
  updatedAt: Date;
}

export interface PaginatedProducts {
  items: FindProductsOutputItem[];
  nextCursor: string | null;  
  hasMore: boolean;
}