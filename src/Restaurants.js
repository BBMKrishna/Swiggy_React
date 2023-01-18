import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Restaurant from "./Restaurant";
import { fetchApiGet } from "./FetchAPI";

function Restaurants() {
  const [restaurants, setRestaurants] = React.useState([]);
  const fetchData = () => {
    fetchApiGet("restaurants").then((data) => {
      setRestaurants(data);
    });
  };
  React.useEffect(() => {
    fetchData();
  }, []);

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
}

export default Restaurants;
