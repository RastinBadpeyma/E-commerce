export const AuthUserRole = {
  ADMIN: "ADMIN",
  CUSTOMER: "CUSTOMER",
} as const;

export type AuthUserRole = (typeof AuthUserRole)[keyof typeof AuthUserRole];
