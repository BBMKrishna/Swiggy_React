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
import { OrderItemType, StoreType } from "./interfaces";
function keyBy(arr: any[], key: "id") {
  return arr.reduce((acc, item) => {
    acc[item[key]] = item;
    return acc;
  }, {});
}

const Style = {
  position: "fixed",
  bottom: "10px",
  right: "700px",
  align: "center",
} as React.CSSProperties;

async function fetch(orderId: string | undefined) {
  const orderItems = await fetchApiGet(`orders/${orderId}/orderitems`);
  const dishes = await fetchApiGet(`dishes`);
  const dishesById = keyBy(dishes, "id");
  const orderItemsWithDishes = orderItems.map((orderItem: OrderItemType) => {
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

function OrderItem() {
  const orderItems = useSelector((store: StoreType) => store.app.orderItems);
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
        <div style={Style}>
          <h2>Bill Amount - ₹{total} </h2>
        </div>
      </div>
    );
  } else {
    return <h1>Loading...</h1>;
  }
}
export default OrderItem;
