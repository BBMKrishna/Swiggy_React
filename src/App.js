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
export const AppContext = React.createContext();

export async function fetchAPI(path) {
  const token = localStorage.getItem("token");
  const res = await fetch(`http://localhost:3080/` + path, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
}

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
    fetch("http://localhost:3080/orders", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify({ orderItems: itemsList }),
    }).then(() => {
      setDishes([]);
      setCartItems([]);
    });
  }
  function fetchAPI(path) {
    fetch(`http://localhost:3080/` + path, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
  }
  function login(e) {
    e.preventDefault();
    const { phone, password } = user;
    if (phone && password !== "") {
      fetch("http://localhost:3080/login", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ phone, password }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            localStorage.setItem("token", data.accessToken);
            setToken((state) => {
              return (state = data.accessToken);
            });
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
      fetch("http://localhost:3080/signup", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ name, phone, password }),
      }).then(() => {
        setUser({ name: "", phone: "", password: "" });
      });
    } else {
      return;
    }
  }
  function formChange(e) {
    setUser((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
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
          fetchAPI,
          token,
          setToken,
          formChange,
          login,
          signup,
          user,
          loginPage,
          setLoginPage,
        }}
      >
        <BrowserRouter>
          <Routes>
            {token === null || token === "" || token === "undefined" ? (
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
