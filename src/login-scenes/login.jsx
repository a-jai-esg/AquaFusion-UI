import { useEffect, useState } from "react";
import LogoComponent from "../components/LogoComponent";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Box, Button, TextField, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Login = ({ setPassword, setEmail, setSession }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [emailField, setEmailField] = useState("");
  const [passwordField, setPasswordField] = useState("");

  useEffect(() => {
    document.title = "Login to AquaFusion";
  }, []);

  const handleClick = (event) => {
    setEmail(emailField);
    setPassword(passwordField);
    setSession(true);
  };

  return (
    <Container maxWidth="md">
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
        <LogoComponent text="Admin Login" />
        <Box noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            onChange={(e) => {
              setEmailField(e.target.value);
            }}
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            onChange={(e) => {
              setPasswordField(e.target.value);
            }}
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            fullWidth
            onClick={handleClick}
            variant="contained"
            color="secondary"
            sx={{
              mt: 3,
              mb: 6,
              fontWeight: 400,
              gridColumn: "span 4",
            }}
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link href="#" variant="body2" color={colors.grey[100]}>
                {"Forgot Password?"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
