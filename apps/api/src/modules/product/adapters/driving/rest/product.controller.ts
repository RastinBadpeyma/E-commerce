import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateProductUseCase } from 'src/modules/product/core/application/use-cases/create-product/create-product.usecase';
import { GetProductsUseCase } from 'src/modules/product/core/application/use-cases/find-products/get-products.usecase';
import { getProductBySlugUseCase } from 'src/modules/product/core/application/use-cases/get-product-by-slug/get-product-by-slug.usecase';

@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getProductUseCase: GetProductsUseCase,
    private readonly getProductBySlugUseCase: getProductBySlugUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.createProductUseCase.execute(dto);
  }
  
  @Get()
   getProducts(
   @Query('cursor') cursor?: string,
   @Query('limit') limit?: string,
  ) {
  return this.getProductUseCase.execute({ 
    cursor, 
    limit: limit ? parseInt(limit, 10) : undefined 
  });
 }

  @Get(':slug')
  getProductBySlug(@Param('slug') slug: string) {
    return this.getProductBySlugUseCase.execute(slug);
  }
}
