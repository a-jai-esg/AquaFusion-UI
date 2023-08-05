import { useEffect } from "react";
import { Box, useTheme, Typography, Container } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import LogoComponent from "../../components/LogoComponent";

const About = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    document.title = "About";
  }, []);

  return (
    <Box m="20px">
      <Box display="flex" justifycontent="space-between" alignItems="center">
        <Header title="About Application" subtitle="AquaFusion Version 1.0" />
      </Box>
      <Container maxWidth="md">
        <Box
          paddingTop="40px"
          paddingBottom="40px"
          borderRadius="15px"
          backgroundColor={colors.primary[400]}
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <LogoComponent
            text="Version: 1.0.0"
            component="h3"
            variant="h4"
            fontWeight={600}
          />
          <Typography
            component="h3"
            variant="h5"
            color={colors.greenAccent[500]}
          >
            AquaFusion is an innovative IoT-based aquaponics monitoring system.
          </Typography>
          <Typography
            component="h3"
            variant="h5"
            color={colors.grey[100]}
            sx={{ paddingTop: 10, textAlign: "center" }}
          >
            Developer Team: <br />
            <br />
            Elijah Nicholas Esguerra
            <br />
            Junester Ursora II <br />
            Janine Christine Vallente <br />
          </Typography>
          <Box noValidate sx={{ mt: 1 }}></Box>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
