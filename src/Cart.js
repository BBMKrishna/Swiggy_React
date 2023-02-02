import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { setOrders } from "./features/home/appSlice";
import {
  addToCart,
  removeFromCart,
  totalAmount,
} from "./features/home/appSlice";
function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.app.cartItems);
  const total = useSelector((store) => store.app.total);
  useEffect(() => {
    dispatch(totalAmount(cartItems));
  }, [cartItems, dispatch]);
  return (
    <div className="container">
      <h1
        style={{
          marginBottom: "24px",
          padding: "16px",
          borderBottom: "1px solid lightgrey",
        }}
      >
        {cartItems.length} dishes
      </h1>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          {cartItems.map((item) => {
            const { id, imageUrl, name, price, quantity } = item;
            return (
              <Card
                key={id}
                className="card"
                style={{ border: " 1px solid grey" }}
                sx={{ display: "flex", margin: 1 }}
              >
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image={imageUrl}
                  alt={name}
                />
                <Box
                  sx={{ display: "flex", flexDirection: "column", width: 180 }}
                >
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography component="div" variant="h5">
                      {name}
                    </Typography>
                    <Typography variant="subtitle1" component="div">
                      {price * quantity} ₹
                    </Typography>
                  </CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      pl: 1,
                      pb: 1,
                    }}
                  >
                    <IconButton
                      onClick={() => {
                        dispatch(removeFromCart(id));
                      }}
                    >
                      <RemoveIcon />
                    </IconButton>

                    <Button variant="outlined">{quantity}</Button>
                    <IconButton
                      onClick={() => {
                        dispatch(addToCart(id));
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Card>
            );
          })}
        </Grid>
      </Box>
      <div
        style={{
          position: "fixed",
          bottom: "10px",
          right: "700px",
          align: "center",
        }}
      >
        <h2>
          Total - ₹{total}
          {cartItems.length > 0 && (
            <Button
              variant="outlined"
              style={{ marginLeft: "20px", color: "green" }}
              onClick={() => {
                dispatch(setOrders(cartItems));
              }}
            >
              Order Items
            </Button>
          )}
        </h2>
      </div>
    </div>
  );
}

export default Cart;
