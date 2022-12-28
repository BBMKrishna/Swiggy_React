import Restaurants from "./Restaurants";
import React from "react";
import Dishes from "./Dishes";
import SharedLayout from "./pages/SharedLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./Cart";
import Order from "./Order";
import OrderItems from "./OrderItems";
export const AppContext = React.createContext();
function App() {
  const [cartItems, setCartItems] = React.useState([]);
  const [dishes, setDishes] = React.useState([]);
  const [orders, setOrders] = React.useState([]);
  const [orderItems, setOrderItems] = React.useState([]);
  function addToCart(id) {
    if (cartItems.find((x) => x.id === id) === undefined) {
      let dishesIndex = dishes.findIndex((item) => item.id === id);
      let newItem = dishes[dishesIndex];
      newItem.quantity = 1;
      setCartItems((prevCart) => {
        return [...prevCart, newItem];
      });
    } else {
      let updatedItem = cartItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: (item.quantity += 1) };
        }
        return item;
      });
      setCartItems(updatedItem);
    }
  }
  function removeFromCart(id) {
    if (cartItems.find((x) => x.id === id).quantity > 1) {
      var newItem = cartItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: (item.quantity -= 1) };
        }
        return item;
      });
      setCartItems(newItem);
    } else {
      newItem = cartItems.filter((item) => item.id !== id);
      setCartItems(newItem);
    }
  }
  function total(cartItems) {

    var total = 0;
    cartItems.forEach((item) => (total += item.quantity * item.price));
    return total.toFixed(2);
  }
  function checkout(itemsList) {
    fetch("http://localhost:3080/orders", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ orderItems: itemsList }),
    }).then(() => {
      setDishes([]);
      setCartItems([]);
    });
  }
  function fetchAPI(path, setFunction) {
    fetch(`http://localhost:3080/` + path)
      .then((res) => res.json())
      .then((data) => setFunction(data));
  }
  return (
    <>
      <AppContext.Provider
        value={{
          cartItems,
          setCartItems,
          dishes,
          setDishes,
          addToCart,
          removeFromCart,
          total,
          orders,
          setOrders,
          orderItems,
          setOrderItems,
          checkout,
          fetchAPI
        }}
      >
        <BrowserRouter>
          <Routes>
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
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </>
  );
}

export default App;
