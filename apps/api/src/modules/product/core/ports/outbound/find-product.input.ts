import { ProductStatus } from "../../domain/entities/product.entity";

export interface FindProducts {
  cursor?: string;      
  limit?: number;        
}


export interface FindProductsOutput {
  title: string;
  price?: number;
  status: ProductStatus;
  updatedAt: Date;
}

export interface PaginatedProducts {
  items: FindProductsOutput[];
  nextCursor: string | null;  
  hasMore: boolean;
}

