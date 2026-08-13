import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthPayload, AuthUserRole } from '@ecommerce/auth-contracts';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateProductUseCase } from 'src/modules/product/core/application/use-cases/create-product/create-product.usecase';
import { GetProductsUseCase } from 'src/modules/product/core/application/use-cases/find-products/get-products.usecase';
import { GetProductBySlugUseCase } from 'src/modules/product/core/application/use-cases/get-product-by-slug/get-product-by-slug.usecase';
import { GetProductBySlugOutput, PaginatedProducts } from 'src/modules/product/core/ports/inbound/find-products';
import { CreateProductInput } from 'src/modules/product/core/ports/inbound/create-product';
import { JwtAuthGuard } from 'src/infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/infrastructure/auth/guards/roles.guard';
import { Roles } from 'src/infrastructure/auth/decorators/roles.decorator';
import { CurrentUser } from 'src/infrastructure/auth/decorators/current-user.decorator';

@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getProductUseCase: GetProductsUseCase,
    private readonly getProductBySlugUseCase: GetProductBySlugUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AuthUserRole.ADMIN)
  create(@Body() dto: CreateProductDto, @CurrentUser() user: AuthPayload) {
    const input: CreateProductInput ={
       title: dto.title,
       slug: dto.slug,
       description: dto.description,
       price: dto.price,
      //  quantity: dto.quantity
    }
    return this.createProductUseCase.execute(input);
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
