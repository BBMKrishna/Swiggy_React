import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeToken } from "../features/home/appSlice";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

function DrawerAppBar(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.app.cartItems);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2, color: "orange" }}>
        Swiggy
      </Typography>
      <Divider />
      <Link to="/" style={{ textDecoration: "none", color: "orange" }}>
        <Button sx={{ color: "orange" }}>Home</Button>
      </Link>
      <Link to="/cart" style={{ textDecoration: "none", color: "orange" }}>
        <Button sx={{ color: "orange" }}>
          Cart {cartItems.length > 0 && `(${cartItems.length})`}
        </Button>
      </Link>
      <Link to="/orders" style={{ textDecoration: "none", color: "orange" }}>
        <Button sx={{ color: "orange" }}>Orders</Button>
      </Link>
      <Button
        sx={{ color: "orange" }}
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("persist:root");
          navigate("/");
          dispatch(removeToken());
        }}
      >
        Logout
      </Button>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          background: "linear-gradient(135deg, #111111 0%, #1f1f1f 100%)",
        }}
      >
        <Toolbar>
          <IconButton
            color="orange"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            style={{ marginLeft: "30px", color: "orange" }}
          >
            <Link
              style={{
                textDecoration: "none",
                color: "orange",
                fontFamily: "serif",
                fontWeight: "700",
                fontSize: "36px",
              }}
              to="/"
            >
              Swiggy
            </Link>
          </Typography>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Link
              style={{
                textDecoration: "none",
                color: "orange",
                fontFamily: "san-serif",
                fontWeight: "700",
                fontSize: "12px",
              }}
              to="/"
            >
              <Button style={{ color: "orange" }}>Home</Button>
            </Link>
            <Link
              style={{
                textDecoration: "none",
                color: "orange",
                fontFamily: "san-serif",
                fontWeight: "700",
                fontSize: "12px",
              }}
              to="/cart"
            >
              <Button style={{ color: "orange" }}>
                Cart
                {cartItems.length > 0 && ` (${cartItems.length})`}
              </Button>
            </Link>
            <Link
              style={{
                textDecoration: "none",
                color: "orange",
                fontFamily: "san-serif",
                fontWeight: "700",
                fontSize: "12px",
              }}
              to="/orders"
            >
              <Button style={{ color: "orange" }}>Orders</Button>
            </Link>
            <Link
              style={{
                textDecoration: "none",
                color: "orange",
                fontFamily: "san-serif",
                fontWeight: "700",
                fontSize: "12px",
              }}
              to="/"
            >
              <Button
                style={{
                  color: "orange",
                  marginRight: "30px",
                }}
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("persist:root");
                  navigate("/");
                  dispatch(removeToken());
                }}
              >
                Logout
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3 }}></Box>
    </Box>
  );
}

export default DrawerAppBar;
