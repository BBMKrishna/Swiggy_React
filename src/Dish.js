import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "./features/home/appSlice";

function Dish({ dish }) {
  const { id, name, price, description, imageUrl } = dish;
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.app.cartItems);
  const item = cartItems.find((item) => item.id === id);
  const quantity = item ? item.quantity : 0;

  const handleAddToCart = () => {
    dispatch(addToCart(id));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(id));
  };

  return (
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
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        component="img"
        height="180"
        image={imageUrl}
        alt={name}
        sx={{ objectFit: "cover" }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" sx={{ color: "#333", fontWeight: "bold" }}>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: "12px" }}>
          {description}
        </Typography>
        <Typography variant="h6" sx={{ color: "orange", fontWeight: "bold" }}>
          ₹{price}
        </Typography>
      </CardContent>
      <CardActions sx={{ padding: "0 16px 16px 16px", justifyContent: "space-between" }}>
        {quantity > 0 ? (
          <>
            <Button
              size="small"
              variant="contained"
              sx={{
                backgroundColor: "#db7c38",
                color: "white",
                "&:hover": {
                  backgroundColor: "#c67a2e",
                },
              }}
              onClick={handleRemoveFromCart}
            >
              <RemoveIcon />
            </Button>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {quantity}
            </Typography>
            <Button
              size="small"
              variant="contained"
              sx={{
                backgroundColor: "#48c479",
                color: "white",
                "&:hover": {
                  backgroundColor: "#3da86a",
                },
              }}
              onClick={handleAddToCart}
            >
              <AddIcon />
            </Button>
          </>
        ) : (
          <Button
            size="small"
            variant="contained"
            fullWidth
            sx={{
              background: "linear-gradient(90deg, rgba(255,96,0,0.8) 0%, rgba(238,69,0,0.9) 100%)",
              color: "white",
              "&:hover": {
                background: "linear-gradient(90deg, rgba(255,96,0,0.9) 0%, rgba(238,69,0,1) 100%)",
              },
            }}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default Dish;
