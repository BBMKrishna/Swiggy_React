import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Restaurant from "./Restaurant";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurants } from "./features/home/appSlice";
import { RestaurantType, StoreType } from "./interfaces";
import { ThunkDispatch } from "@reduxjs/toolkit";

function Restaurants() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const restaurants = useSelector(
    (store: StoreType): RestaurantType[] => store.app.restaurants
  );
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    dispatch(getRestaurants());
    setLoading(true);
  }, [dispatch, setLoading]);
  if (loading) {
    return (
      <div className="container">
        <h1
          style={{
            marginBottom: "24px",
            padding: "16px",
            borderBottom: "1px solid lightgrey",
          }}
        >
          {restaurants.length} restaurants
        </h1>

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
            {restaurants.map((restaurant) => {
              return <Restaurant key={restaurant.id} restaurant={restaurant} />;
            })}
          </Grid>
        </Box>
      </div>
    );
  } else {
    return <>Loading...</>;
  }
}
export default Restaurants;
