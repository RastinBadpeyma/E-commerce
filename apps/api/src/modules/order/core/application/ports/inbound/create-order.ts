export interface CreateOrderItemCommand {
  productId: string;
  quantity: number;
}

export interface CreateOrderCommand {
  userId: string;
  items: CreateOrderItemCommand[];
}

export interface CreateOrderResult {
  id: string;
  userId: string;
  status: string;
  totalAmount: number;

  items: {
    id: string;
    productId: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }[];
}

