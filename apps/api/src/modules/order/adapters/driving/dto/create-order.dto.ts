import { ArrayMinSize, IsArray, IsInt, IsUUID, Min } from "class-validator";

export class CreateOrderDto {
  @IsArray()
  @ArrayMinSize(1)
  items!: CreateOrderItemDto[];
}

export class CreateOrderItemDto {
  @IsUUID()
  productId!: string;

  @IsInt()
  @Min(1)
  quantity!: number;
}