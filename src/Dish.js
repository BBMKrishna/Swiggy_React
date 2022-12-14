import CircleIcon from "@mui/icons-material/Circle";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

function Dish({ dish }) {
  const { imageUrl, name, nonVeg, price } = dish;
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
}

export default Dish;
