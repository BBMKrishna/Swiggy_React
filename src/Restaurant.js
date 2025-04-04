import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

function Restaurant({ restaurant }) {
  const { id, imageUrl, name, address, city, rating } = restaurant;
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Link style={{ textDecoration: "none" }} to={`/restaurants/${id}/dishes`}>
        <Card
          sx={{
            maxWidth: 345,
            minWidth: 300,
            border: "1px solid #ddd",
            borderRadius: "12px",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
            transition: "transform 0.2s, box-shadow 0.3s",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0 12px 20px rgba(0, 0, 0, 0.3)",
            },
            overflow: "hidden",
            height: "100%",
          }}
        >
          <CardMedia
            component="img"
            height="220"
            image={imageUrl}
            alt={name}
            sx={{ objectFit: "cover" }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" sx={{ color: "orange", fontWeight: "bold" }}>
              {name}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
              <LocationOnIcon sx={{ color: "grey", marginRight: "4px", fontSize: "small" }} />
              <Typography variant="body2" color="text.secondary">
                {address}
              </Typography>
            </Box>
          </CardContent>
          <CardActions sx={{ justifyContent: "space-between", padding: "0 16px 16px 16px" }}>
            <Button
              sx={{
                backgroundColor: rating < 4 ? "#db7c38" : "#48c479",
                color: "white",
                padding: "4px 8px",
                borderRadius: "4px",
                "&:hover": {
                  backgroundColor: rating < 4 ? "#c67a2e" : "#3da86a",
                },
              }}
            >
              <StarIcon sx={{ fontSize: "small", marginRight: "4px" }} />
              {rating}
            </Button>
            <Typography
              variant="body2"
              sx={{
                color: "grey",
                fontWeight: "500",
              }}
            >
              {city}
            </Typography>
          </CardActions>
        </Card>
      </Link>
    </Grid>
  );
}

export default Restaurant;
