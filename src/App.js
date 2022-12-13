import Restaurant from "./Restaurant";
import React from "react";
import Dishes from "./Dishes";
import SharedLayout from "./pages/SharedLayout";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Restaurant />}></Route>
            <Route path="restaurants/:restaurantId" element={<Dishes />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
