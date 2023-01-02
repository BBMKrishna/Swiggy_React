import { AppContext, fetchAPI } from "./App";
import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import { useParams } from "react-router-dom";
function keyBy(arr, key) {
  return arr.reduce((acc, item) => {
    acc[item[key]] = item;
    return acc;
  }, {});
}

async function fetch(orderId) {
  const orderItems = await fetchAPI(`orders/${orderId}/orderitems`);
  const dishes = await fetchAPI(`dishes`);
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
  const { orderItems, setOrderItems, setDishes } = React.useContext(AppContext);
  const [loading, setLoading] = React.useState(false);
  const { orderId } = useParams();
  React.useEffect(() => {
    fetch(orderId).then(({ dishes, orderItems }) => {
      setDishes(dishes);
      setOrderItems(orderItems);
      setLoading(true);
    });
  }, [setDishes, setOrderItems, orderId]);

  let total = 0;
  if (loading) {
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
              const { id, quantity, price, dish } = item;
              total = total + quantity * price;

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
                      <div style={{ margin: "12px" }}>
                        <h4>{dish.name}</h4>
                        <CardMedia
                          component="img"
                          sx={{
                            width: 151,
                            height: 140,
                            border: "1px solid black",
                            borderRadius: 4,
                          }}
                          image={dish.imageUrl}
                          alt={dish.name}
                        />
                      </div>
                    </Box>
                    <CardContent
                      sx={{
                        flex: "1 0 auto",
                        bgcolor: "orange",
                        color: "black",
                      }}
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
  } else {
    return <h1>Loading...</h1>;
  }
}
export default OrderItems;
