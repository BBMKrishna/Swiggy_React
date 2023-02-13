import { fetchApiGet } from "./FetchAPI";
import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateOrders } from "./features/home/appSlice";
import { OrderType, StoreType } from "./interfaces";

function groupBy(arr: any[], key: "orderId") {
  return arr.reduce((acc, item) => {
    acc[item[key]] ? acc[item[key]].push(item) : (acc[item[key]] = [item]);
    return acc;
  }, {});
}

async function fetch() {
  let orders = await fetchApiGet(`orders`);
  const orderItems = await fetchApiGet(`orderItems`);
  const orderitemsLengthByOrderId = groupBy(orderItems, "orderId");
  const ordersWithItemsLength = orders.map((order: OrderType) => {
    return {
      ...order,
      orderItemsLength: orderitemsLengthByOrderId[order.id].length,
    };
  });
  orders = ordersWithItemsLength;
  return orders;
}

function Order() {
  const dispatch = useDispatch();
  const orders = useSelector((store: StoreType) => store.app.orders);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    fetch().then((data) => {
      dispatch(updateOrders(data));
      setLoading(true);
    });
  }, [dispatch]);
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
