import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Restaurant from "./Restaurant";
const url = "http://localhost:3080/restaurants";

function Restaurants() {
  const [data, setData] = React.useState([]);
  const fetchData = () => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
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
        {data.length} restaurants
      </h1>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          {data.map((restaurant) => {
            return <Restaurant restaurant={restaurant} />;
          })}
        </Grid>
      </Box>
    </div>
  );
}

export default Restaurants;
