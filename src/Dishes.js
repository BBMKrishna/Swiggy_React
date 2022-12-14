import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Dish from "./Dish";
const Dishes = () => {
  const [dishes, setDishes] = React.useState([]);
  useEffect(() => {
    fetch("http://localhost:3080/Dishes")
      .then((res) => res.json())
      .then((data) => {
        setDishes(data);
      });
  }, []);

  const { restaurantId } = useParams();
  const Dishes = dishes.filter(
    (dish) => dish.restaurantId === parseInt(restaurantId)
  );
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
          {Dishes.length} dishes
        </h1>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
            {Dishes.map((dish) => {
              return <Dish key={dish.id} dish={dish} />;
            })}
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default Dishes;
