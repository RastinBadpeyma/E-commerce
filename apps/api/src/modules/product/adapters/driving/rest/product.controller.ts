import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateProductUseCase } from 'src/modules/product/core/application/use-cases/create-product/create-product.usecase';
import { GetProductsUseCase } from 'src/modules/product/core/application/use-cases/find-products/get-products.usecase';
import { GetProductBySlugUseCase } from 'src/modules/product/core/application/use-cases/get-product-by-slug/get-product-by-slug.usecase';
import { FindProductsInput, GetProductBySlugOutput, PaginatedProducts } from 'src/modules/product/core/ports/inbound/find-products';

@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getProductUseCase: GetProductsUseCase,
    private readonly getProductBySlugUseCase: GetProductBySlugUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.createProductUseCase.execute(dto);
  }
  
  @Get()
   async getProducts(
   @Query('cursor') cursor?: string,
   @Query('limit') limit?: string,
  ) {
  const result: PaginatedProducts = await this.getProductUseCase.execute({ 
    cursor, 
    limit: limit ? parseInt(limit, 10) : undefined 
  });
  return result;
 }

  @Get(':slug')
  async getProductBySlug(@Param('slug') slug: string): Promise<GetProductBySlugOutput | null> {
    const result =  this.getProductBySlugUseCase.execute(slug);
    return result;
  }
}
