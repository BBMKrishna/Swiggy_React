import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./features/home/appSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
});
