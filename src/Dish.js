import CircleIcon from "@mui/icons-material/Circle";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import React from "react";
import { AppContext } from "./App";
function Dish({ dish }) {
  const { addToCart } = React.useContext(AppContext);
  const { id, imageUrl, name, nonVeg, price } = dish;
  return (
    <Grid item xs={3}>
      <Card className="card" sx={{ maxWidth: 345 }}>
        <CardMedia component="img" height="220" image={imageUrl} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            style={{
              backgroundColor: nonVeg ? "#db7c38" : "#48c479",
              color: "white",
            }}
          >
            <CircleIcon className="start" fontSize="small" />
          </Button>
          <Button
            style={{
              color: "grey",
              marginLeft: "20%",
              fontSize: "20px",
            }}
            size="medium"
          >
            
            ${price}
          </Button>
          <Button
            onClick={() => { addToCart(id) }}
            style={{ marginLeft: "20%" }}
            variant="outlined"
            color="success"
          >
            Add
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default Dish;
