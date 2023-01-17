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
import { fetchApiPost, fetchApiPostUnauth } from "./FetchAPI";
export const AppContext = React.createContext();
function App() {
  const [cartItems, setCartItems] = React.useState([]);
  const [dishes, setDishes] = React.useState([]);
  const [orders, setOrders] = React.useState([]);
  const [orderItems, setOrderItems] = React.useState([]);
  const [token, setToken] = React.useState(localStorage.getItem("token"));
  const [user, setUser] = React.useState({ name: "", phone: "", password: "" });
  const [loginPage, setLoginPage] = React.useState(true);
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
    fetchApiPost("orders", { orderItems: itemsList }).then(() => {
      setDishes([]);
      setCartItems([]);
    });
  }

  function login(e) {
    e.preventDefault();
    const { phone, password } = user;
    if (phone && password !== "") {
      fetchApiPostUnauth("login", { phone, password })
        .then((data) => {
          if (data) {
            localStorage.setItem("token", data.accessToken);
            setToken(data.accessToken);
          }
        })
        .then(() => {
          setUser({ name: "", phone: "", password: "" });
        })
        .catch((err) => console.log(err));
    } else {
      return;
    }
  }
  function signup(e) {
    e.preventDefault();
    const { name, phone, password } = user;
    if (name && phone && password !== "") {
      fetchApiPostUnauth("signup", { name, phone, password }).then(() => {
        setUser({ name: "", phone: "", password: "" });
      });
    } else {
      return;
    }
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
          token,
          setToken,
          login,
          signup,
          user,
          loginPage,
          setLoginPage,
          setUser,
        }}
      >
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
      </AppContext.Provider>
    </>
  );
}

export default App;
