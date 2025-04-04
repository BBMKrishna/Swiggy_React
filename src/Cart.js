import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector, useDispatch } from "react-redux";
import { setOrders, addToCart, removeFromCart, totalAmount } from "./features/home/appSlice";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.app.cartItems);
  const total = useSelector((store) => store.app.total);

  useEffect(() => {
    dispatch(totalAmount(cartItems));
  }, [cartItems, dispatch]);

  const handleAddToCart = (id) => {
    dispatch(addToCart(id));
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handlePlaceOrder = () => {
    dispatch(setOrders(cartItems));
  };

  return (
    <div className="container" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <h1
        style={{
          marginBottom: "24px",
          padding: "16px",
          borderBottom: "1px solid lightgrey",
          color: "orange",
          textAlign: "left",
        }}
      >
        Your Cart
      </h1>

      <Box
        sx={{
          flexGrow: 1,
          background: "linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "80px", // Space for the total at bottom
        }}
      >
        <Grid container spacing={3}>
          {cartItems.map((item) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                <Card
                  sx={{
                    border: "1px solid #ddd",
                    borderRadius: "12px",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                    transition: "transform 0.2s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "scale(1.03)",
                      boxShadow: "0 12px 20px rgba(0, 0, 0, 0.3)",
                    },
                    overflow: "hidden",
                    height: "100%",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="180"
                    image={item.imageUrl}
                    alt={item.name}
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div" sx={{ color: "#333", fontWeight: "bold" }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ marginBottom: "8px" }}>
                      Price: ₹{item.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Quantity: {item.quantity}
                    </Typography>
                    <Typography variant="h6" sx={{ color: "orange", fontWeight: "bold", marginTop: "8px" }}>
                      Subtotal: ₹{item.price * item.quantity}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "space-between", padding: "0 16px 16px 16px" }}>
                    <IconButton
                      aria-label="remove"
                      onClick={() => handleRemoveFromCart(item.id)}
                      sx={{
                        backgroundColor: "#db7c38",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "#c67a2e",
                        },
                      }}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      {item.quantity}
                    </Typography>
                    <IconButton
                      aria-label="add"
                      onClick={() => handleAddToCart(item.id)}
                      sx={{
                        backgroundColor: "#48c479",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "#3da86a",
                        },
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      <div
        style={{
          marginTop: "20px",
          textAlign: "right",
          padding: "16px",
          position: "sticky",
          bottom: 0,
          background: "white",
          boxShadow: "0 -4px 10px rgba(0, 0, 0, 0.1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "orange" }}>
          Total: ₹{total}
        </Typography>
        <Button
          startIcon={<ShoppingCartIcon />}
          sx={{
            background: "linear-gradient(90deg, rgba(255,96,0,0.8) 0%, rgba(238,69,0,0.9) 100%)",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
            fontWeight: "bold",
            "&:hover": {
              background: "linear-gradient(90deg, rgba(255,96,0,0.9) 0%, rgba(238,69,0,1) 100%)",
            },
          }}
          onClick={handlePlaceOrder}
        >
          Place Order
        </Button>
      </div>
    </div>
  );
}

export default Cart;
