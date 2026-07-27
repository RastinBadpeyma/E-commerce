import { Product } from "../../domain/entities/product.entity";

export interface FindProductsInput {
  cursor?: string;      
  limit?: number;        
}

export interface PaginatedProducts {
  items: Product[];
  nextCursor: string | null;  
  hasMore: boolean;
}