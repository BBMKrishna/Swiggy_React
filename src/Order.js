import { AppContext } from "./App";
import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
function Order() {
  const { orderItems, setOrderItems, orders, setOrders, fetchAPI } =
    React.useContext(AppContext);
  React.useEffect(() => {
    fetchAPI("orders", setOrders);
    fetchAPI("orderitems", setOrderItems);
  }, []);
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
            const { id, createdAt } = item;
            let d = new Date(createdAt);
            const orderLength = orderItems.filter(
              (item) => item.orderId === id
            );
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
                            {orderLength.length}
                            items ordered on - {d.getDate()}/{d.getMonth()}/
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
}
export default Order;
