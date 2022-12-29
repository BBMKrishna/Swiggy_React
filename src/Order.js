import { AppContext, fetchAPI } from "./App";
import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";

function keyBy(arr, key) {
  return arr.reduce((acc, item) => {
    acc[item[key]] ? acc[item[key]].push(item) : (acc[item[key]] = [item]);
    return acc;
  }, {});
}

async function fetch() {
  let orders = await fetchAPI(`orders`);
  const orderItems = await fetchAPI(`orderItems`);
  const orderitemsLengthByOrderId = keyBy(orderItems, "orderId");
  const ordersWithItemsLength = orders.map((order) => {
    return {
      ...order,
      orderItemsLength: orderitemsLengthByOrderId[order.id].length,
    };
  });
  orders = ordersWithItemsLength;
  return orders;
}

function Order() {
  const { orders, setOrders } = React.useContext(AppContext);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    fetch().then((data) => {
      setOrders(data);
      setLoading(true);
    });
  }, [setOrders]);
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
          {orders.length} Previous Orders
        </h1>

        <Box sx={{ flexGrow: 1 }}>
          <Grid container>
            {orders.map((item) => {
              const { id, createdAt, orderItemsLength } = item;
              let d = new Date(createdAt);
              return (
                <div key={id}>
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/orders/${id}/orderitems`}
                  >
                    <Card
                      className="card"
                      style={{ border: " 1px solid grey" }}
                      sx={{ display: "flex", margin: 1 }}
                    >
                      <Avatar
                        sx={{ width: 150, height: 150, bgcolor: "orange" }}
                        variant="square"
                      >
                        <h6>order number - {id} </h6>
                      </Avatar>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          width: 180,
                        }}
                      >
                        <CardContent sx={{ flex: "1 0 auto" }}>
                          <Typography variant="subtitle1" component="div">
                            <h6>
                              {orderItemsLength > 1
                                ? `${orderItemsLength} items ordered on`
                                : `${orderItemsLength} item ordered on`}
                              - {d.getDate()}/{d.getMonth() + 1}/
                              {d.getFullYear()}
                            </h6>
                          </Typography>
                        </CardContent>
                      </Box>
                    </Card>
                  </Link>
                </div>
              );
            })}
          </Grid>
        </Box>
      </div>
    );
  } else {
    return <h1>Loading...</h1>;
  }
}
export default Order;
