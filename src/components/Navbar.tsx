import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeToken } from "../features/home/appSlice";
import { useNavigate } from "react-router-dom";
import { StoreType } from "../../src/interfaces";

function DrawerAppBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((store: StoreType) => store.app.cartItems);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        style={{
          backgroundColor: "white",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            style={{ marginLeft: "30px" }}
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
                fontFamily: "serif",
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
              <Button style={{ color: "orange" }}>orders</Button>
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
      <Box component="main" sx={{ p: 3 }}></Box>
    </Box>
  );
}

export default DrawerAppBar;
