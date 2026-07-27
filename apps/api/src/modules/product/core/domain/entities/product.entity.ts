export enum ProductStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
}

export class Product {
  constructor(
    public readonly _id: string,
    public _title: string,
    public _slug: string,
    public _description: string,
    public _price: number,
    public _quantity: number,
    public _status: ProductStatus,
    public _createdAt: Date = new Date(),
    public _updatedAt: Date = new Date(),


  ) {}

}
