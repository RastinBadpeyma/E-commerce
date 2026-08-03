export enum ProductStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
}

export class Product {
  constructor(
    public readonly _id: string,
    public title: string,
    public slug: string,
    public description: string,
    public price: number,
    public quantity: number,
    public status: ProductStatus,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}
      
}
