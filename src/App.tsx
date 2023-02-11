import Restaurants from "./Restaurants";
import React from "react";
import Dishes from "./Dishes";
import SharedLayout from "./pages/SharedLayout";
import SharedLayoutLogin from "./pages/SharedLayoutLogin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./Cart";
import Order from "./Order";
import OrderItems from "./OrderItems";
import Signup from "./Signup";
import Login from "./Login";
import { useSelector } from "react-redux";
import { StoreType } from "./interfaces";
function App() {
  const token = useSelector((store:StoreType) => store.app.token);
  return (
    <>
      <BrowserRouter>
        <Routes>
          {token === null || token === "" || token === undefined ? (
            <Route path="/" element={<SharedLayoutLogin />}>
              <Route index element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </Route>
          ) : (
            <Route path="/" element={<SharedLayout />}>
              <Route index element={<Restaurants />} />
              <Route
                path="restaurants/:restaurantId/dishes"
                element={<Dishes />}
              />
              <Route path="cart" element={<Cart />} />
              <Route path="orders" element={<Order />} />
              <Route
                path="orders/:orderId/orderitems"
                element={<OrderItems />}
              />
            </Route>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
