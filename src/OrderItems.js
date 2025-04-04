import { fetchApiGet } from "./FetchAPI";
import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateOrderItems } from "./features/home/appSlice";
import Chip from "@mui/material/Chip";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

function keyBy(arr, key) {
  return arr.reduce((acc, item) => {
    acc[item[key]] = item;
    return acc;
  }, {});
}

async function fetch(orderId) {
  const orderItems = await fetchApiGet(`orders/${orderId}/orderitems`);
  const dishes = await fetchApiGet(`dishes`);
  const dishesById = keyBy(dishes, "id");
  const orderItemsWithDishes = orderItems.map((orderItem) => {
    return {
      ...orderItem,
      dish: dishesById[orderItem.dishId],
    };
  });
  return {
    orderItems: orderItemsWithDishes,
    dishes,
  };
}

function OrderItems() {
  const orderItems = useSelector((store) => store.app.orderItems);
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const { orderId } = useParams();

  React.useEffect(() => {
    fetch(orderId).then(({ dishes, orderItems }) => {
      dispatch(updateOrderItems({ dishes, orderItems }));
      setLoading(true);
    });
  }, [dispatch, orderId]);

  let total = 0;
  if (loading) {
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
          {orderItems.length} Items in Order #{orderId}
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
            {orderItems.map((item) => {
              const { id, quantity, price, dish } = item;
              total += quantity * price;

              return (
                <Grid item xs={12} sm={6} md={4} key={id}>
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
                      image={dish.imageUrl}
                      alt={dish.name}
                      sx={{ objectFit: "cover" }}
                    />
                    <CardContent sx={{ padding: "16px", flexGrow: 1 }}>
                      <Typography gutterBottom variant="h6" component="div" sx={{ color: "#333", fontWeight: "bold" }}>
                        {dish.name}
                      </Typography>

                      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                        <LocalOfferIcon sx={{ color: "orange", marginRight: "8px" }} />
                        <Typography variant="body1" sx={{ fontWeight: "500" }}>
                          ₹{price} per item
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                        <ShoppingBasketIcon sx={{ color: "orange", marginRight: "8px" }} />
                        <Typography variant="body1">
                          Quantity: {quantity}
                        </Typography>
                      </Box>

                      <Chip
                        label={`Subtotal: ₹${price * quantity}`}
                        sx={{
                          backgroundColor: "orange",
                          color: "white",
                          fontWeight: "bold",
                          marginTop: "8px",
                          width: "100%",
                        }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>

        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "16px",
            background: "white",
            boxShadow: "0 -4px 10px rgba(0, 0, 0, 0.1)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "orange" }}>
            Total Bill Amount: ₹{total}
          </Typography>
        </Box>
      </div>
    );
  } else {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Typography variant="h4" sx={{ color: "orange" }}>Loading...</Typography>
      </div>
    );
  }
}

export default OrderItems;
