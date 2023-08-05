import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoComponent from "../components/LogoComponent";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Box, Button, TextField, useTheme } from "@mui/material";
import { tokens } from "../theme";

const ForgottenPassword = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [workgroupField, setWorkgroupField] = useState("");
  const [emailField, setEmailField] = useState("");

  useEffect(() => {
    document.title = "Forgotten Password";
  }, []);

  let navigate = useNavigate();

  const routeChangeFindAccount = () => {
    let path = "/change-password";
    navigate(path);
  };

  const routeChangeSupport = () => {
    let path = "/support";
    navigate(path);
  };

  const routeChangeLogin = () => {
    let path = "/";
    navigate(path);
  };

  const handleClick = (event) => {};

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
        <LogoComponent
          text="Forgotten Password?"
          component="h1"
          variant="h2"
          fontWeight={600}
        />
        <Box noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="workgroup"
            label="Workgroup Name"
            name="workgroupName"
            onChange={(e) => {
              setWorkgroupField(e.target.value);
            }}
            autoComplete="workgroup-name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="email"
            onChange={(e) => {
              setEmailField(e.target.value);
            }}
            label="Email"
            type="email"
            id="email"
            autoComplete="current-password"
          />
          <Button
            fullWidth
            onClick={routeChangeFindAccount}
            variant="contained"
            color="secondary"
            sx={{
              mt: 3,
              mb: 6,
              fontWeight: 400,
              gridColumn: "span 4",
            }}
          >
            Find Account
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                component="button"
                variant="body2"
                onClick={routeChangeSupport}
                sx={{
                  color: "#ffffff",
                }}
              >
                No account? Call support to register.
              </Link>
            </Grid>
            <Grid item>
              <Link
                component="button"
                variant="body2"
                onClick={routeChangeLogin}
                sx={{
                  color: "#ffffff",
                }}
              >
                Remembered Account? Login here.
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default ForgottenPassword;