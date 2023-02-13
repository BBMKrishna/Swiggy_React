import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Dish from "./Dish";
import { useSelector, useDispatch } from "react-redux";
import { getDishes } from "./features/home/appSlice";
import { StoreType } from "./interfaces";
import { ThunkDispatch } from "@reduxjs/toolkit";
const Dishes = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const dishes = useSelector((store: StoreType) => store.app.dishes);
  const { restaurantId }: any = useParams();
  const restaurantID: number = parseInt(restaurantId);
  useEffect(() => {
    dispatch(getDishes(restaurantID));
  }, [dispatch, restaurantID]);

  return (
    <>
      <div className="container">
        <h1
          style={{
            marginBottom: "24px",
            padding: "16px",
            borderBottom: "1px solid lightgrey",
          }}
        >
          {dishes.length} dishes
        </h1>

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
            {dishes.map((dish) => {
              return <Dish key={dish.id} dish={dish} />;
            })}
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default Dishes;
