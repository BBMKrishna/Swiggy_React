import { Link, useParams } from "react-router-dom";
import CircleIcon from "@mui/icons-material/Circle";
import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Dishes = () => {
  const [dishes, setDishes] = React.useState([]);
  useEffect(() => {
    fetch("http://localhost:3080/Dishes")
      .then((res) => res.json())
      .then((data) => {
        setDishes(data);
      });
  }, []);

  const { restaurantId } = useParams();
  dishes.forEach((dish) => {
    console.log(dish.restaurantId == restaurantId);
  });
  const Dishes = dishes.filter((dish) => dish.restaurantId == restaurantId);
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
          {Dishes.length} dishes
        </h1>

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
            {Dishes.map((dish) => {
              const { id, imageUrl, name, nonVeg, price } = dish;
              return (
                <Grid item xs={3}>
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
                          marginLeft: "50%",
                        }}
                        size="medium"
                      >
                        ${price}
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
};

export default Dishes;
