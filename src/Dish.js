import CircleIcon from "@mui/icons-material/Circle";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import React from "react";
import Box from "@mui/material/Box";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import { addToCart, removeFromCart } from "./features/home/appSlice";
import { useDispatch, useSelector } from "react-redux";
function Dish({ dish }) {
  const dispatch = useDispatch();
  const cartItems  = useSelector((store) => store.app.cartItems);
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
            ₹{price}
          </Button>
          {cartItems.find((x) => x.id === id)?.quantity > 0 ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                pl: 1,
                pb: 1,
              }}
              style={{ marginLeft: "-4%" }}
            >
              <IconButton
                onClick={() => {
                  dispatch(removeFromCart(id));
                }}
              >
                <RemoveIcon />
              </IconButton>

              <Button variant="outlined">
                {cartItems.find((x) => x.id === id).quantity}
              </Button>
              <IconButton
                onClick={() => {
                  dispatch(addToCart(id));
                }}
              >
                <AddIcon />
              </IconButton>
            </Box>
          ) : (
            <Button
              onClick={() => {
                dispatch(addToCart(id));
              }}
              style={{ marginLeft: "20%" }}
              variant="outlined"
              color="success"
            >
              Add
            </Button>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}

export default Dish;
