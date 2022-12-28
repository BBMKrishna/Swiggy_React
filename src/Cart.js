import { AppContext } from "./App";
import React from "react";
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

function Cart() {
  const { cartItems, addToCart, removeFromCart, total, checkout } =
    React.useContext(AppContext);
  const totalAmount = React.useMemo(() => total(cartItems), [cartItems, total]);
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
                        removeFromCart(id);
                      }}
                    >
                      <RemoveIcon />
                    </IconButton>

                    <Button variant="outlined">{quantity}</Button>
                    <IconButton
                      onClick={() => {
                        addToCart(id);
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
          Total - ₹ {totalAmount}
          {cartItems.length > 0 && (
            <Button
              variant="outlined"
              style={{ marginLeft: "20px", color: "green" }}
              onClick={() => {
                checkout(cartItems);
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
