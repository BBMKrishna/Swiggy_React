export type LoginUser = {
  phone: string;
  password: string;
};

export type User = {
  name: string;
  phone: string;
  password: string;
};

export type CartItemType = {
  price: number;
  quantity: number;
  id: number;
  name: string;
  address: string;
  city: string;
  rating: 4;
  imageUrl: string;
  restaurantId: number;
  nonVeg: boolean;
};

export type OrderType = {
  id: number;
  userId: number;
  orderItemsLength: number;
  createdAt: string;
};

export type OrderItemType = {
  id: number;
  quantity: number;
  price: number;
  orderId: number;
  dishId: number;
  dish: CartItemType;
};

export type InitialState = {
  cartItems: CartItemType[];
  orders: OrderType[];
  orderItems: OrderItemType[];
  dishes: CartItemType[];
  token: null | string;
  restaurants: [];
  total: number;
};
export type RestaurantType = {
  id: number;
  imageUrl: string;
  name: string;
  address: string;
  city: string;
  rating: number;
};

export type StoreType = {
  app: InitialState;
};
