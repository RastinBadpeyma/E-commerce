export const UserRole = {
  ADMIN: "ADMIN",
  CUSTOMER: "CUSTOMER",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export class User {
  constructor(
    public readonly id: string,
    public phoneNumber: string,
    public role: UserRole,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
