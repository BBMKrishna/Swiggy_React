import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchApiPostUnauth, fetchApiGet, fetchApiPost } from "../../FetchAPI";
import { CartItemType, InitialState, User, LoginUser } from "../../interfaces";

const initialState: InitialState = {
  cartItems: [],
  orders: [],
  orderItems: [],
  dishes: [],
  token: localStorage.getItem("token"),
  restaurants: [],
  total: 0,
};

export const getDishes = createAsyncThunk(
  "app/getDishes",
  async (restaurantId: number) => {
    try {
      const dish = await fetchApiGet(`restaurants/${restaurantId}/dishes`);
      return dish;
    } catch (err) {
      console.log(err);
    }
  }
);

export const getRestaurants = createAsyncThunk(
  "app/getRestaurants",
  async () => {
    try {
      const restaurants = await fetchApiGet(`restaurants`);
      return restaurants;
    } catch (err) {
      console.log(err);
    }
  }
);

export const logIn = createAsyncThunk("app/logIn", async (user: LoginUser) => {
  const { phone, password } = user;
  const accessKey = await fetchApiPostUnauth("login", { phone, password });
  return accessKey;
});
export const signUp = createAsyncThunk("app/signUp", async (user: User) => {
  const { name, phone, password } = user;
  await fetchApiPostUnauth("signup", { name, phone, password });
});

export const setOrders = createAsyncThunk(
  "app/setOrders",
  async (cartItems: CartItemType[]) => {
    try {
      await fetchApiPost("orders", { orderItems: cartItems });
    } catch (err) {
      console.log(err);
    }
  }
);
const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addToCart: (state: InitialState, action) => {
      const id: number = action.payload;
      if (state.cartItems.find((x) => x.id === id) === undefined) {
        let dishesIndex = state.dishes.findIndex((item) => item.id === id);
        let newItem = state.dishes[dishesIndex];
        newItem.quantity = 1;
        state.cartItems.push(newItem);
      } else {
        let updatedItem = state.cartItems.map((item) => {
          if (item.id === id) {
            item.quantity += 1;
          }
          return item;
        });
        state.cartItems = updatedItem;
      }
    },
    removeFromCart: (state, action) => {
      const id: number = action.payload;
      let quantityMoreThanOne: any = state.cartItems.find(
        (x) => x.id === id
      )?.quantity;
      if (quantityMoreThanOne > 1) {
        var newItem = state.cartItems.map((item) => {
          if (item.id === id) {
            item.quantity -= 1;
          }
          return item;
        });
        state.cartItems = newItem;
      } else {
        newItem = state.cartItems.filter((item) => item.id !== id);
        state.cartItems = newItem;
      }
    },
    updateOrderItems: (state, action) => {
      const { dishes, orderItems } = action.payload;
      state.dishes = dishes;
      state.orderItems = orderItems;
    },
    updateOrders: (state, action) => {
      state.orders = action.payload;
    },
    removeToken: (state) => {
      state.token = null;
      window.location.reload();
    },
    totalAmount: (state, action) => {
      let temp = 0;
      action.payload.forEach(
        (item: CartItemType) => (temp += item.quantity * item.price)
      );
      state.total = temp;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDishes.fulfilled, (state, action) => {
        state.dishes = action.payload;
      })
      .addCase(getRestaurants.fulfilled, (state, action) => {
        state.restaurants = action.payload;
      })
      .addCase(setOrders.fulfilled, (state) => {
        state.cartItems = [];
        state.dishes = [];
      })
      .addCase(logIn.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload.accessToken);
        localStorage.removeItem("persist:root");
        window.location.reload();
      });
  },
});
export const {
  addToCart,
  removeFromCart,
  updateOrderItems,
  updateOrders,
  removeToken,
  totalAmount,
} = appSlice.actions;

export default appSlice.reducer;
