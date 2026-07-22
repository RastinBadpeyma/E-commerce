import { IsString, IsNumber, IsPositive, MinLength, IsEnum, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(1)
  title!: string;

  @IsString()
  @MinLength(1)
  slug!: string;

  @IsString()
  description!: string;

  @IsNumber()
  @IsPositive()
  price!: number;

  @IsNumber()
  @IsPositive()
  quantity!: number;

}