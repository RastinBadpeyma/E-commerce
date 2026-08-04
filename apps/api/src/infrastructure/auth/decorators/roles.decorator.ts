import { SetMetadata } from '@nestjs/common';
import { AuthUserRole } from '@ecommerce/auth-contracts';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: AuthUserRole[]) => SetMetadata(ROLES_KEY, roles);
