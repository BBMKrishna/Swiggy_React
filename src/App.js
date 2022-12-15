import Restaurants from "./Restaurants";
import React from "react";
import Dishes from "./Dishes";
import SharedLayout from "./pages/SharedLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Restaurants />} />
            <Route path="restaurants/:restaurantId/dishes" element={<Dishes />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
