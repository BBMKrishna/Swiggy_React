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
function Restaurant({ restaurant }) {
  const { id, imageUrl, name, address, city, rating } = restaurant;
  return (
    <Grid item xs={3}>
      <Link style={{ textDecoration: "none" }} to={`/dishes/${id}`}>
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
}

export default Restaurant;
