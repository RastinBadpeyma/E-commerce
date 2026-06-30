export class User {
  constructor(
    public readonly id: string,
    public phoneNumber: string,
    public role: string,
    public createdAt: Date,
    public updatedAt: Date,

  ) {}
}
