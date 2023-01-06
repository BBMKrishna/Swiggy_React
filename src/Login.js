import React from "react";
import { AppContext } from "./App";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const { user, formChange, login } = React.useContext(AppContext);
  const { phone, password } = user;
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div></div>
        </Grid>
        <Grid item xs={6}>
          <form
            style={{
              margin: "200px auto",
              maxWidth: "350px",
              padding: "80px 20px",
              borderRadius: "8px",
              border: "2px solid white",
              textAlign: "center",
              boxShadow:
                " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
            onSubmit={(e) => {
              login(e);
            }}
          >
            <label>Phone : </label>
            <input
              type="tel"
              placeholder="enter your phone number"
              name="phone"
              value={phone}
              onChange={(e) => formChange(e)}
            ></input>
            <br /> <br />
            <label>Password : </label>
            <input
              type="text"
              placeholder="enter your password"
              name="password"
              value={password}
              onChange={(e) => formChange(e)}
            ></input>
            <br /> <br />
            <button
              type="submit"
              style={{
                backgroundColor: "orange",
                color: "black",
                margin: "0 auto",
              }}
            >
              Login
            </button>
            <h4>
              New user?{" "}
              <span
                onClick={() => {
                  navigate("/signup");
                }}
              >
                signup
              </span>
            </h4>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Login;
