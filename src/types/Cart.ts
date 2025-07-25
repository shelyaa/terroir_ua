export interface CartItem {
  id: string;         
  wineId: string;
  quantity: number;
  price: number;
}

export interface CartState {
  cartItems: CartItem[];
  amount: number;
  deliveryPrice: number;
  totalPrice: number;
  loading: boolean;
  error: string | null;
}