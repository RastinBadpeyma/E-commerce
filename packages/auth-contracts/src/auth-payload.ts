import { AuthUserRole } from "./auth-user-role";

export interface AuthPayload {
  sub: string;
  role: AuthUserRole;
}
