import { cartContext } from "./App";
import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CircleIcon from "@mui/icons-material/Circle";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
function Cart() {
  const { cartItems } = React.useContext(cartContext);
  return (
    <>
      <div className="container">
        <h1
          style={{
            marginBottom: "24px",
            padding: "16px",
            borderBottom: "1px solid lightgrey",
          }}
        >
          {cartItems.length} dishes
        </h1>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
            {cartItems.map((item) => {
              const { id, imageUrl, name, nonVeg, price, quantity } = item;
              return (
                <Grid item xs={3} key={id}>
                  <Card className="card" sx={{ maxWidth: 345 }}>
                    <CardMedia component="img" height="220" image={imageUrl} />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {name}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        style={{
                          backgroundColor: nonVeg ? "#db7c38" : "#48c479",
                          color: "white",
                        }}
                      >
                        <CircleIcon className="start" fontSize="small" />
                      </Button>
                      <Button
                        style={{
                          color: "grey",
                          marginLeft: "20%",
                        }}
                        size="medium"
                      >
                        ${price}
                      </Button>
                      <Button
                        style={{ marginLeft: "20%" }}
                        variant="outlined"
                        color="success"
                      >
                        {quantity}
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </div>
    </>
  );
}

export default Cart;
