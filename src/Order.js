import { fetchApiGet } from "./FetchAPI";
import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateOrders } from "./features/home/appSlice";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import DateRangeIcon from "@mui/icons-material/DateRange";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

function groupBy(arr, key) {
  return arr.reduce((acc, item) => {
    acc[item[key]] ? acc[item[key]].push(item) : (acc[item[key]] = [item]);
    return acc;
  }, {});
}

async function fetch() {
  let orders = await fetchApiGet(`orders`);
  const orderItems = await fetchApiGet(`orderItems`);
  const orderitemsLengthByOrderId = groupBy(orderItems, "orderId");
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
  const dispatch = useDispatch();
  const orders = useSelector((store) => store.app.orders);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    fetch()
      .then((data) => {
        dispatch(updateOrders(data));
        setLoading(true);
      })
      .catch((err) => console.log(err));
  }, [dispatch]);

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
          {orders.length} Previous Orders
        </h1>

        <Box
          sx={{
            flexGrow: 1,
            background: "linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <Grid container spacing={3}>
            {orders.map((item) => {
              const { id, createdAt, orderItemsLength } = item;
              let d = new Date(createdAt);
              const formattedDate = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;

              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={id}>
                  <Link style={{ textDecoration: "none" }} to={`/orders/${id}/orderitems`}>
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
                        component="div"
                        sx={{
                          height: 120,
                          background: "linear-gradient(90deg, rgba(255,96,0,0.8) 0%, rgba(238,69,0,0.9) 100%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                        }}
                      >
                        <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
                          Order #{id}
                        </Typography>
                      </CardMedia>

                      <CardContent sx={{ padding: "16px" }}>
                        <Box sx={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                          <RestaurantIcon sx={{ color: "orange", marginRight: "8px" }} />
                          <Typography variant="body1" sx={{ fontWeight: "500" }}>
                            {orderItemsLength} {orderItemsLength > 1 ? "Items" : "Item"}
                          </Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                          <DateRangeIcon sx={{ color: "orange", marginRight: "8px" }} />
                          <Typography variant="body1">
                            {formattedDate}
                          </Typography>
                        </Box>

                        <Chip
                          label="Delivered"
                          sx={{
                            backgroundColor: "#48c479",
                            color: "white",
                            fontWeight: "bold",
                            marginTop: "8px"
                          }}
                          icon={<LocalShippingIcon style={{ color: "white" }} />}
                        />
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
              );
            })}
          </Grid>
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

export default Order;
