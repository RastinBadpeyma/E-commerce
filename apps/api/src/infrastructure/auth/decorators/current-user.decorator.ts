import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthPayload } from '@ecommerce/auth-contracts';

export const CurrentUser = createParamDecorator(
  (data: keyof AuthPayload | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as AuthPayload;

    return data ? user?.[data] : user;
  },
);
