import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchApiPostUnauth, fetchApiGet, fetchApiPost } from "../../FetchAPI";

const initialState = {
  user: { name: "", phone: "", password: "" },
  loginPage: true,
  cartItems: [],
  orders: [],
  orderItems: [],
  value: 0,
  dishes: [],
  token: localStorage.getItem("token"),
  restaurants: [],
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
  console.log(accessKey);
  return accessKey;
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
const homeSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    formChange: (state, action) => {
      const event = action.payload.target;
      state.user[event.name] = event.value;
    },
    signup: (state, action) => {
      action.payload.preventDefault();
      const { name, phone, password } = state.user;
      if (name && phone && password !== "") {
        fetchApiPostUnauth("signup", { name, phone, password }).then(() => {
          state.user = { name: "", phone: "", password: "" };
        });
      } else {
        return;
      }
    },
    addToCart: (state, action) => {
      const id = action.payload;
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
      const id = action.payload;
      if (state.cartItems.find((x) => x.id === id).quantity > 1) {
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDishes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDishes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dishes = action.payload;
      })
      .addCase(getDishes.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getRestaurants.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRestaurants.fulfilled, (state, action) => {
        state.isLoading = false;
        state.restaurants = action.payload;
      })
      .addCase(getRestaurants.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(setOrders.fulfilled, (state, action) => {
        state.cartItems = [];
        state.dishes = [];
      })
      .addCase(logIn.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload.accessToken);
        window.location.reload();
      });
  },
});
export const {
  formChange,
  signup,
  login,
  clear,
  addToCart,
  removeFromCart,
  checkout,
  updateOrderItems,
  updateOrders,
  removeToken,
} = homeSlice.actions;

export default homeSlice.reducer;
