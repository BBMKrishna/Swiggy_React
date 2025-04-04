import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchApiPostUnauth, fetchApiGet, fetchApiPost } from "../../FetchAPI";

const initialState = {
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
  async (restaurantId) => {
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

export const logIn = createAsyncThunk("app/logIn", async (user) => {
  const { phone, password } = user;
  const accessKey = await fetchApiPostUnauth("login", { phone, password });
  return accessKey;
});
export const signUp = createAsyncThunk("app/signUp", async (user) => {
  const { name, phone, password } = user;
  await fetchApiPostUnauth("signup", { name, phone, password });
});

export const setOrders = createAsyncThunk(
  "app/setOrders",
  async (cartItems) => {
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
    addToCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find(item => item.id === id);

      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      } else {
        const newItem = state.dishes.find(dish => dish.id === id);
        return {
          ...state,
          cartItems: [...state.cartItems, { ...newItem, quantity: 1 }],
        };
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      const itemToRemove = state.cartItems.find(item => item.id === id);

      if (itemToRemove.quantity === 1) {
        return {
          ...state,
          cartItems: state.cartItems.filter(item => item.id !== id),
        };
      } else {
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          ),
        };
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
      action.payload.forEach((item) => (temp += item.quantity * item.price));
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
  checkout,
  updateOrderItems,
  updateOrders,
  removeToken,
  totalAmount,
} = appSlice.actions;

export default appSlice.reducer;
