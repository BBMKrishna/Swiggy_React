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
    if (cartItems.find((x) => x.id === id) === undefined) {
      let dishesIndex = dishes.findIndex((item) => item.id === id);
      let newItem = dishes[dishesIndex];
      newItem.quantity = 1;
      setCartItems((prevCart) => {
        return [...prevCart, newItem];
      });
    } else {
      const newItem = cartItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: (item.quantity += 1) };
        }
        return item;
      });
      setCartItems(newItem);
    }
  }

  return (
    <>
      <AppContext.Provider
        value={{ cartItems, setCartItems, dishes, setDishes, addToCart }}
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
