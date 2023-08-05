import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LogoComponent from "../../components/LogoComponent";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const Support = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    document.title = "Call Technical Support";
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
          text="AquaFusion Technical Support"
          component="h2"
          variant="h3"
          fontWeight={600}
        />
        <Typography
          variant="h4"
          color={colors.grey[100]}
          fontWeight="300"
          textAlign="center"
          sx={{ marginBottom: "5px" }}
        >
          Call hotline number 123-4567 to request for an administrator account.
        </Typography>
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

export default Support;
