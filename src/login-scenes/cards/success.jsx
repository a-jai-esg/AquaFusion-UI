import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LogoComponent from "../../components/LogoComponent";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Box, Button, TextField, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const Success = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    document.title = "Successfully Changed!";
  }, []);

  let navigate = useNavigate();

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
          text="Password is successfully changed!"
          component="h2"
          variant="h3"
          fontWeight={600}
        />
        <Box noValidate sx={{ mt: 1 }}>
          <Button
            fullWidth
            onClick={routeChangeLogin}
            variant="contained"
            color="secondary"
            sx={{
              mt: 3,
              mb: 6,
              fontWeight: 400,
              gridColumn: "span 4",
            }}
          >
            Return to Login
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link
                component="button"
                variant="body2"
                onClick={routeChangeLogin}
                sx={{
                  color: "#ffffff",
                }}
              ></Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Success;
