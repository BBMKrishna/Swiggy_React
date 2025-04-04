import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Restaurant from "./Restaurant";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurants } from "./features/home/appSlice";

function Restaurants() {
  const dispatch = useDispatch();
  const restaurants = useSelector((store) => store.app.restaurants);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    dispatch(getRestaurants());
    setLoading(true);
  }, [dispatch]);

  if (loading) {
    return (
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
          {restaurants?.length} Restaurants
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
            {restaurants?.map((restaurant) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={restaurant.id}>
                <Restaurant restaurant={restaurant} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    );
  } else {
    return <h1 style={{ color: "orange", textAlign: "center" }}>Loading...</h1>;
  }
}

export default Restaurants;
