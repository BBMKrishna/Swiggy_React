export type LoginUser = {
  phone: string;
  password: string;
};

export type User = {
  name: string;
  phone: string;
  password: string;
};

export type CartItems = {
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

export type Orders = {
  id: number;
  userId: number;
  orderItemsLength: number;
  createdAt: string;
};

export type OrderItems = {
  id: number;
  quantity: number;
  price: number;
  orderId: number;
  dishId: number;
  dish: CartItems;
};

export type InitialState = {
  cartItems: CartItems[];
  orders: Orders[];
  orderItems: OrderItems[];
  dishes: CartItems[];
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
