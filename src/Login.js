import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn } from "./features/home/appSlice";
// Import additional Material-UI components
import {
  TextField,
  Button,
  Typography,
  Paper,
  Container,
  InputAdornment,
  Divider,
  useTheme,
  IconButton
} from "@mui/material";
// Import icons
import {
  Phone as PhoneIcon,
  Lock as LockIcon,
  ArrowForward as ArrowForwardIcon,
  Fastfood as FastfoodIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

// Enhanced cursor animation component
const CursorEffect = () => {
  const [bubbles, setBubbles] = useState([]);
  const maxBubbles = 20; // Limit the number of bubbles

  useEffect(() => {
    let animationFrameId;

    const handleMouseMove = (e) => {
      if (Math.random() > 0.7) {
        const newBubble = {
          id: Date.now(),
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 60 + 20, // Larger size range
          color: Math.random() > 0.7 ? 'rgba(255, 120, 0, 0.15)' : 'rgba(0, 0, 0, 0.07)',
          duration: Math.random() * 1.5 + 0.8 // Random duration
        };

        setBubbles(prev => {
          // Limit the number of bubbles
          if (prev.length < maxBubbles) {
            return [...prev, newBubble];
          }
          return prev;
        });

        setTimeout(() => {
          setBubbles(prev => prev.filter(bubble => bubble.id !== newBubble.id));
        }, newBubble.duration * 1000);
      }
    };

    const throttledMouseMove = (e) => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      animationFrameId = requestAnimationFrame(() => handleMouseMove(e));
    };

    window.addEventListener('mousemove', throttledMouseMove);
    return () => {
      window.removeEventListener('mousemove', throttledMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          style={{
            position: 'absolute',
            left: bubble.x,
            top: bubble.y,
            width: bubble.size,
            height: bubble.size,
            borderRadius: '50%',
            background: bubble.color,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 9,
            animation: `bubbleFloat ${bubble.duration}s cubic-bezier(0.25, 0.1, 0.25, 1) forwards`
          }}
        />
      ))}
      <style jsx="true">{`
        @keyframes bubbleFloat {
          0% { 
            opacity: 0.4; 
            transform: translate(-50%, -50%) scale(0.2);
            filter: blur(0px);
          }
          50% { 
            opacity: 0.7; 
            transform: translate(-50%, -70px) scale(1);
            filter: blur(1px);
          }
          100% { 
            opacity: 0; 
            transform: translate(-50%, -120px) scale(1.2);
            filter: blur(2px);
          }
        }
      `}</style>
    </div>
  );
};

function Login() {
  const [user, setUser] = useState({ phone: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { phone, password } = user;
  const theme = useTheme();

  const loginFood = "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/AboutUs_Image_vasx6j";

  const formChange = (event) => {
    event.preventDefault();
    setUser((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phone && password !== "") {
      try {
        dispatch(logIn(user));
        setUser({ phone: "", password: "" });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Box sx={{
      minHeight: "100vh",
      width: "100%",
      background: "linear-gradient(135deg, #111111 0%, #1f1f1f 100%)",
      display: "flex",
      position: "relative",
      overflow: "hidden"
    }}>
      <CursorEffect />

      {/* Subtle background elements */}
      <Box sx={{
        position: "absolute",
        top: "10%",
        right: "5%",
        width: "400px",
        height: "400px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,96,0,0.05) 0%, rgba(0,0,0,0) 70%)",
        filter: "blur(40px)",
        opacity: 0.6
      }} />

      <Box sx={{
        position: "absolute",
        bottom: "15%",
        left: "10%",
        width: "300px",
        height: "300px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,96,0,0.07) 0%, rgba(0,0,0,0) 70%)",
        filter: "blur(30px)",
        opacity: 0.5
      }} />

      <Container
        maxWidth={false}
        disableGutters
        sx={{
          flex: 1,
          display: "flex",
          position: "relative",
          zIndex: 1
        }}
      >
        <Grid
          container
          sx={{
            flex: 1,
            m: 0
          }}
        >
          <Grid item xs={12} md={6} sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            p: { xs: 2, md: 6 }
          }}>
            <Box sx={{
              color: "white",
              position: "relative",
              zIndex: 2,
              paddingRight: { md: "40px" }
            }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <FastfoodIcon sx={{ fontSize: 40, color: "rgba(255,96,0,0.8)", mr: 2 }} />
                <Typography variant="h4" fontWeight="600" sx={{ letterSpacing: "1px" }}>
                  Swiggy
                </Typography>
              </Box>

              <Typography variant="h2" fontWeight="bold" mb={2} sx={{
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                background: "linear-gradient(90deg, #ffffff 0%, #e0e0e0 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "-0.5px"
              }}>
                Delivering the food you love
              </Typography>

              <Typography variant="h6" mb={4} sx={{
                color: "rgba(255,255,255,0.7)",
                fontWeight: 400,
                lineHeight: 1.6
              }}>
                Login to your account and enjoy the best food delivered right to your doorstep in minutes.
              </Typography>

              <Box
                sx={{
                  display: { xs: "none", md: "block" },
                  position: "relative",
                  width: "80%",
                  mt: 6,
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "70%",
                    height: "20px",
                    background: "radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 80%)",
                    borderRadius: "50%",
                    filter: "blur(5px)",
                    zIndex: -1
                  }
                }}
              >
                {/* Placeholder for an image - replace with your actual food image */}
                <Box
                  component="img"
                  src={loginFood}
                  alt="Food illustration"
                  sx={{
                    maxWidth: "100%",
                    height: "auto",
                    display: "block",
                    objectFit: "contain",
                    filter: "drop-shadow(0 20px 20px rgba(0,0,0,0.3))",
                    transition: "all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)",
                    transform: "translateY(0)",
                    "&:hover": {
                      transform: "translateY(-15px)",
                      filter: "drop-shadow(0 25px 18px rgba(0,0,0,0.4))"
                    }
                  }}
                />
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6} sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(15,15,15,0.7)",
            minHeight: "100%",
            position: "relative"
          }}>
            {/* Subtle glass-like overlay */}
            <Box sx={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
              backdropFilter: "blur(5px)"
            }} />

            <Box sx={{
              width: "100%",
              maxWidth: "450px",
              p: { xs: 2, md: 4 },
              position: "relative",
              zIndex: 2
            }}>
              <Box textAlign="left" mb={5}>
                <Typography variant="h4" fontWeight="bold" color="#fff" mb={1} sx={{
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: "-10px",
                    left: 0,
                    width: "40px",
                    height: "3px",
                    background: "rgba(255,96,0,0.8)"
                  }
                }}>
                  Welcome Back
                </Typography>
                <Typography variant="body1" color="rgba(255,255,255,0.6)" mt={2}>
                  Please sign in to continue
                </Typography>
              </Box>

              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  label="Phone Number"
                  placeholder="Enter your phone number"
                  name="phone"
                  value={phone}
                  onChange={formChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon sx={{ color: "rgba(255,96,0,0.7)" }} />
                      </InputAdornment>
                    ),
                    autoComplete: "off",
                  }}
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      '& fieldset': {
                        borderColor: 'rgba(255,255,255,0.1)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(255,255,255,0.2)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'rgba(255,96,0,0.5)',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'rgba(255,255,255,0.6)',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: 'rgba(255,96,0,0.7)',
                    },
                    '& .MuiInputBase-input::placeholder': {
                      color: 'rgba(255,255,255,0.3)',
                    },
                  }}
                />

                <TextField
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  label="Password"
                  placeholder="Enter your password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={formChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: "rgba(255,96,0,0.7)" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <VisibilityOff sx={{ color: "rgba(255,96,0,0.7)" }} /> : <Visibility sx={{ color: "rgba(255,96,0,0.7)" }} />}
                        </IconButton>
                      </InputAdornment>
                    ),
                    autoComplete: "off",
                  }}
                  sx={{
                    mb: 4,
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      '& fieldset': {
                        borderColor: 'rgba(255,255,255,0.1)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(255,255,255,0.2)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'rgba(255,96,0,0.5)',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'rgba(255,255,255,0.6)',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: 'rgba(255,96,0,0.7)',
                    },
                    '& .MuiInputBase-input::placeholder': {
                      color: 'rgba(255,255,255,0.3)',
                    },
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    py: 1.5,
                    mt: 2,
                    mb: 4,
                    background: "linear-gradient(90deg, rgba(255,96,0,0.8) 0%, rgba(238,69,0,0.9) 100%)",
                    boxShadow: "0 8px 20px -10px rgba(255,96,0,0.5)",
                    color: "white",
                    fontWeight: "bold",
                    border: "none",
                    borderRadius: "4px",
                    letterSpacing: "0.5px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: "linear-gradient(90deg, rgba(255,96,0,0.9) 0%, rgba(238,69,0,1) 100%)",
                      boxShadow: "0 12px 25px -8px rgba(255,96,0,0.6)",
                      transform: "translateY(-2px)"
                    },
                    "&:active": {
                      transform: "translateY(0)",
                      boxShadow: "0 5px 15px -10px rgba(255,96,0,0.4)"
                    }
                  }}
                >
                  Sign In
                </Button>

                <Divider sx={{
                  my: 3,
                  opacity: 0.3,
                  "&::before, &::after": {
                    borderColor: "rgba(255,255,255,0.1)",
                  },
                  "& .MuiDivider-wrapper": {
                    padding: "0 10px"
                  }
                }}>
                  <Typography variant="body2" color="rgba(255,255,255,0.4)">
                    OR
                  </Typography>
                </Divider>

                <Box textAlign="center">
                  <Typography variant="body2" color="rgba(255,255,255,0.7)">
                    New to Swiggy?{" "}
                    <Typography
                      component="span"
                      sx={{
                        color: "rgba(255,96,0,0.8)",
                        fontWeight: "medium",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          color: "rgba(255,96,0,1)",
                          textDecoration: "underline"
                        }
                      }}
                      onClick={() => navigate("/signup")}
                    >
                      Create an account
                    </Typography>
                  </Typography>
                </Box>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Login;
