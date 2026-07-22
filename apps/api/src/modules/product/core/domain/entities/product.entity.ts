export enum ProductStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
}

export class Product {
  constructor(
    private readonly _id: string,
    private _title: string,
    private _slug: string,
    private _description: string,
    private _price: number,
    private _quantity: number,
    private _status: ProductStatus,
  ) {}

}
