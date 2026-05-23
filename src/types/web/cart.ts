export interface ICartItem {
  id: number;
  name: string;
  price: number;
  current_price: number;
  quantity: number;
  image?: string;
}
export interface IPayloadOrder {
  name: string;
  address: string;
  phone: string;
  product: [
    {
      quantity: number;
      price: number;
    }
  ];
  quantity: number;
  email: string;
  note: string;
}
