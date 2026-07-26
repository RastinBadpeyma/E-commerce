import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateProductUseCase } from 'src/modules/product/core/application/use-cases/create-product/create-product.usecase';
import { GetProductsUseCase } from 'src/modules/product/core/application/use-cases/find-products/get-products.usecase';

@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getProductUseCase: GetProductsUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.createProductUseCase.execute(dto);
  }
  
  @Get()
  async getProducts() {
    return this.getProductUseCase.execute();
  }
}
