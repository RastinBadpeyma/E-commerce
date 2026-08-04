import { AuthPayload } from "./auth-payload";
import { AuthUserRole } from "./auth-user-role";

export function createAuthPayload(sub: string, role: AuthUserRole): AuthPayload {
  return { sub, role };
}
