import { Controller, Post, Body, UseGuards } from "@nestjs/common";
import { CurrentUser } from "src/infrastructure/auth/decorators/current-user.decorator";
import { CreateOrderDto } from "./dto/create-order.dto";
import { AuthPayload, AuthUserRole } from "@ecommerce/auth-contracts";
import { CreateOrderUseCase } from "../../core/application/use-cases/create-order/create-order.usecase";
import { Roles } from "src/infrastructure/auth/decorators/roles.decorator";
import { JwtAuthGuard } from "src/infrastructure/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/infrastructure/auth/guards/roles.guard";

@Controller('orders')
export class OrderController {
  constructor(
    private readonly createOrder: CreateOrderUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AuthUserRole.CUSTOMER)
  async create(
    @CurrentUser() user: AuthPayload,
    @Body() dto: CreateOrderDto,

  ) {
    return this.createOrder.execute({
      userId: user.sub,
      items: dto.items,
    });
  }
}