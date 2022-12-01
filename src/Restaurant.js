import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/Star";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Restaurant(props) {
  const { imageUrl, name, address, city, rating } = props.info;
  return (
    <Grid item xs={3}>
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
            <StarIcon fontSize="small" />
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
    </Grid>
  );
}

export default Restaurant;
