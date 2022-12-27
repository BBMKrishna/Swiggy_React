import { AppContext } from "./App";
import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import { useParams } from "react-router-dom";
function Orderitems() {
  const { orderItems, setOrderItems, dishes, setDishes } =
    React.useContext(AppContext);

  const { orderId } = useParams();
  React.useEffect(() => {
    fetch(`http://localhost:3080/orders/${orderId}/orderitems`)
      .then((res) => res.json())
      .then((data) => {
        setOrderItems(data);
      });
    fetch("http://localhost:3080/dishes")
      .then((res) => res.json())
      .then((data) => setDishes(data));
  }, [orderId, setDishes, setOrderItems]);
  let total = 0;
  return (
    <div className="container">
      <h1
        style={{
          marginBottom: "24px",
          padding: "16px",
          borderBottom: "1px solid lightgrey",
        }}
      >
        {orderItems.length} items
      </h1>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          {orderItems.map((item) => {
            const { id, quantity, price, dishId } = item;
            total = total + quantity * price;
            let dish = dishes.filter((item) => item.id === dishId);

            return (
              <Card
                key={id}
                className="card"
                style={{ border: " 1px solid grey" }}
                sx={{ display: "flex", margin: 1 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: 180,
                  }}
                >
                  <Box>
                    {dish.map((item) => {
                      const { name, imageUrl } = item;
                      return (
                        <div style={{ margin: "12px" }}>
                          <h4>{name}</h4>
                          <CardMedia
                            component="img"
                            sx={{
                              width: 151,
                              height: 140,
                              border: "1px solid black",
                              borderRadius: 4,
                            }}
                            image={imageUrl}
                            alt={name}
                          />
                        </div>
                      );
                    })}
                  </Box>
                  <CardContent
                    sx={{ flex: "1 0 auto", bgcolor: "orange", color: "black" }}
                  >
                    <Typography variant="subtitle1" component="div">
                      <h6>
                        <b>Quantity-{quantity}</b>
                      </h6>
                      <strong>
                        <p>Sub total- ₹{price * quantity}</p>
                      </strong>
                    </Typography>
                  </CardContent>
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
        <h2>Bill Amount - ₹{total} </h2>
      </div>
    </div>
  );
}
export default Orderitems;
