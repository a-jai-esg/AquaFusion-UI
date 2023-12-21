import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoComponent from "../components/LogoComponent";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { tokens } from "../theme";
import {
  Box,
  Button,
  TextField,
  useTheme,
  CircularProgress,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Login = ({ setSessionIsActive }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [loading, setLoading] = useState(false);
  const [emailField, setEmailField] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordField, setPasswordField] = useState("");

  useEffect(() => {
    document.title = "AquaFusion CPanel";
  }, []);

  let navigate = useNavigate();

  const routeChangeForgottenPassword = () => {
    navigate("/forgotten-password");
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginClick = () => {
    setLoading(true);
    const adminLoginURL =
      "https://us-central1-aquafusion-b8744.cloudfunctions.net/api/farmadmin/account/login";

    axios
      .post(adminLoginURL, {
        emailAddress: emailField,
        password: passwordField,
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("userData", JSON.stringify(response.data));
          localStorage.setItem("emailAddress", emailField);
          localStorage.setItem("password", passwordField);

          // Fetch aggregated system data only if login is successful
          const aggregatedSystemDataURL =
            "https://us-central1-aquafusion-b8744.cloudfunctions.net/api/system/administrative/get_aggregated_system_values";
          axios
            .post(aggregatedSystemDataURL, {
              emailAddress: emailField,
              password: passwordField,
            })
            .then((aggregatedData) => {
              if (aggregatedData.status === 200) {
                localStorage.setItem(
                  "systemData",
                  JSON.stringify(aggregatedData.data)
                );
              }
            })
            .catch(() => {
              toast.error(
                "Failed to get Aquaponics System's Value. Please check your internet connectivity.",
                {
                  position: "top-center",
                  autoClose: 1500,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: false,
                  progress: undefined,
                  theme: "colored",
                }
              );
            });

          setSessionIsActive(true);
        } else {
          toast.error("Login failed. Please try again.", {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "colored",
          });
        }
      })
      .catch(() => {
        toast.error("Login failed. Please try again.", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container maxWidth="md">
      <ToastContainer />
      <Box
        padding="50px"
        borderRadius="15px"
        backgroundColor={colors.primary[400]}
        sx={{
          marginTop: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <LogoComponent
          text="ADMIN LOGIN"
          component="h1"
          variant="h2"
          fontWeight={600}
        />
        <Box noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            onChange={(e) => setEmailField(e.target.value)}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            onChange={(e) => setPasswordField(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                    style={{
                      color: showPassword
                        ? theme.palette.text.primary
                        : theme.palette.text.secondary,
                    }}
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
          />
          <Button
            fullWidth
            onClick={handleLoginClick}
            variant="contained"
            color="secondary"
            sx={{
              pt: 2,
              pb: 2,
              mt: 3,
              mb: 6,
              fontWeight: 400,
              gridColumn: "span 4",
            }}
          >
            {loading ? (
              <CircularProgress
                size={24}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  mt: "-12px",
                  ml: "12px",
                }}
              />
            ) : (
              "Login"
            )}
          </Button>
          <Grid container>
            <Grid item>
              <Link
                component="button"
                variant="body2"
                onClick={routeChangeForgottenPassword}
                sx={{ color: colors.grey[200] }}
              >
                Forgotten Password? Click here.
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
