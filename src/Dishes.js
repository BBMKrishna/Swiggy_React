import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Dish from "./Dish";
import { useSelector, useDispatch } from "react-redux";
import { getDishes } from "./features/home/appSlice";
const Dishes = () => {
  const dispatch = useDispatch();
  const { dishes } = useSelector((store) => store.app);
  const { restaurantId } = useParams();
  useEffect(() => {
    dispatch(getDishes(restaurantId));
  }, [dispatch, restaurantId]);

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
