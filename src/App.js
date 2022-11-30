import Restaurant from "./Restaurant";
import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

function App() {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    fetch("http://localhost:3080/restaurants")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
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
          {data.map((item) => (
            <Restaurant key={item.id} info={item} />
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default App;
