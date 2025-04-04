import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Dish from "./Dish";
import { useSelector, useDispatch } from "react-redux";
import { getDishes } from "./features/home/appSlice";

const Dishes = () => {
  const dispatch = useDispatch();
  const dishes = useSelector((store) => store.app.dishes);
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
            color: "orange",
            textAlign: "left",
          }}
        >
          {dishes.length} Dishes
        </h1>

        <Box
          sx={{
            flexGrow: 1,
            background: "linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <Grid container spacing={3}>
            {dishes.map((dish) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={dish.id}>
                <Dish dish={dish} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default Dishes;
