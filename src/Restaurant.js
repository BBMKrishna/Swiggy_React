import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
const url = "http://localhost:3080/restaurants";

function Restaurant(props) {
  const [data, setData] = React.useState([]);
  const fetchData = React.useCallback(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, [url]);
  React.useEffect(() => {
    fetchData();
  }, [url, fetchData]);

  return (
    <div className="container">
      <h1
        style={{
          marginBottom: "24px",
          padding: "16px",
          borderBottom: "1px solid lightgrey",
        }}
      >
        {data.length} restaurants
      </h1>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          {data.map((restaurant) => {
            const { id, imageUrl, name, address, city, rating } = restaurant;
            return (
              <Grid item xs={3}>
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/restaurants/${id}`}
                >
                  <Card className="card" sx={{ maxWidth: 345 }}>
                    <CardMedia component="img" height="220" image={imageUrl} />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {address}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        style={{
                          backgroundColor: rating < 4 ? "#db7c38" : "#48c479",
                          color: "white",
                        }}
                      >
                        <StarIcon className="start" fontSize="small" />
                        {rating}
                      </Button>
                      <Button
                        style={{
                          color: "grey",
                          marginLeft: "50%",
                        }}
                        size="medium"
                      >
                        {city}
                      </Button>
                    </CardActions>
                  </Card>
                </Link>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </div>
  );
}

export default Restaurant;
