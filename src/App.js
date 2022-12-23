import Restaurants from "./Restaurants";
import React from "react";
import Dishes from "./Dishes";
import SharedLayout from "./pages/SharedLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./Cart";
export const AppContext = React.createContext();
function App() {
  const [cartItems, setCartItems] = React.useState([]);
  const [dishes, setDishes] = React.useState([]);
  function addToCart(id) {
    console.log(id);
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
    console.log(id);
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
  function total() {
    var total = 0;
    cartItems.forEach((item) => (total += item.quantity * item.price));
    return total.toFixed(2)
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
          total
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
            </Route>
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </>
  );
}

export default App;
