import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Dish from "./Dish";
import { AppContext } from "./App";
const Dishes = () => {
  const { dishes, setDishes, token } = React.useContext(AppContext);
  const { restaurantId } = useParams();
  useEffect(() => {
    fetch(`http://localhost:3080/restaurants/${restaurantId}/dishes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setDishes(data);
      });
  }, [restaurantId, setDishes, token]);

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
