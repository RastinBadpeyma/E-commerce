import { Product } from '../entities/product.entity';

export interface CreateProductInput {
  title: string;
  slug: string;
  description: string;
  price: number;
  quantity: number;
}

export interface IProductRepository {
  create(command: CreateProductInput): Promise<Product>;

}
