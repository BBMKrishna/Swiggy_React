import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUp } from "./features/home/appSlice";
function Signup() {
  const [user, setUser] = React.useState({ name: "", phone: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name, phone, password } = user;
  function formChange(event) {
    event.preventDefault();
    setUser((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  }
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
              textAlign: "center",
              boxShadow:
                " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2)",
            }}
            onSubmit={(e) => {
              e.preventDefault();
              const { name, phone, password } = user;
              if (name && phone && password !== "") {
                try {
                  dispatch(signUp(user));
                  setUser({ name: "", phone: "", password: "" });
                  navigate("/");
                } catch (err) {
                  console.log(err);
                }
              } else {
                return;
              }
            }}
          >
            <label htmlFor="name">Username : </label>
            <input
              type="text"
              placeholder="enter your Name"
              name="name"
              value={name}
              onChange={(e) => formChange(e)}
            ></input>
            <br />
            <br />
            <label>Phone : </label>
            <input
              type="tel"
              placeholder="enter your phone number"
              name="phone"
              value={phone}
              onChange={(e) => formChange(e)}
            ></input>
            <br /> <br />
            <label>Password :</label>
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
                margin: "0 10px",
              }}
            >
              Sign Up
            </button>
            <h4>
              Already a user?{" "}
              <span
                onClick={() => {
                  navigate("/");
                }}
              >
                login
              </span>
            </h4>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Signup;
