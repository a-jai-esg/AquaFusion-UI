import { useEffect } from "react";
import { Box, useTheme, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { tokens } from "../../theme";

const TechnicalSupport = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  let navigate = useNavigate();

  useEffect(() => {
    document.title = "Technical Support";
  }, []);

  const routeChange = () => {
    let path = "/about";
    navigate(path);
  };

  return (
    <Box m="25px">
      <Header
        title="Technical Support"
        subtitle="Call hotlines 123-4567 for additional support"
      ></Header>

      <Box p="25px">
        {/* Connectivity Issues */}
        <Accordion
          sx={{
            "& .MuiAccordionSummary-root": {
              background: `${colors.primary[400]} !important`,
            },
            "& .MuiAccordionDetails-root": {
              background: `${colors.primary[400]} !important`,
            },
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreOutlinedIcon />}>
            <Typography
              color={colors.greenAccent[500]}
              variant="h6"
              fontWeight={700}
            >
              Aquafusion is not connecting to the network.
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            Check your internet connection. Restart your router and the
            Aquafusion system. Ensure the device is within the Wi-Fi range.
          </AccordionDetails>
        </Accordion>

        {/* Sensor Inaccuracies */}
        <Accordion
          sx={{
            "& .MuiAccordionSummary-root": {
              background: `${colors.primary[400]} !important`,
            },
            "& .MuiAccordionDetails-root": {
              background: `${colors.primary[400]} !important`,
            },
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreOutlinedIcon />}>
            <Typography
              color={colors.greenAccent[500]}
              variant="h6"
              fontWeight={700}
            >
              pH or temperature readings are inaccurate.
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            Calibrate the sensors following the manual's instructions. Contact
            support to ask for a replacement of the sensors if they are damaged
            or have surpassed their lifespan.
          </AccordionDetails>
        </Accordion>

        {/* Data Syncing Error */}
        <Accordion
          sx={{
            "& .MuiAccordionSummary-root": {
              background: `${colors.primary[400]} !important`,
            },
            "& .MuiAccordionDetails-root": {
              background: `${colors.primary[400]} !important`,
            },
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreOutlinedIcon />}>
            <Typography
              color={colors.greenAccent[500]}
              variant="h6"
              fontWeight={700}
            >
              Data is not syncing with the mobile app or cloud service.
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            Ensure your device has the latest software update. Restart the
            device and check your app or cloud settings.
          </AccordionDetails>
        </Accordion>
        {/* Alarm/Notification issues */}
        <Accordion
          sx={{
            "& .MuiAccordionSummary-root": {
              background: `${colors.primary[400]} !important`,
            },
            "& .MuiAccordionDetails-root": {
              background: `${colors.primary[400]} !important`,
            },
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreOutlinedIcon />}>
            <Typography
              color={colors.greenAccent[500]}
              variant="h6"
              fontWeight={700}
            >
              Not receiving alerts when parameters are out of range.
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            Check notification settings in the app. Ensure your device allows
            notifications from the Aquafusion app.
          </AccordionDetails>
        </Accordion>

        {/* Power Supply Issues */}
        <Accordion
          sx={{
            "& .MuiAccordionSummary-root": {
              background: `${colors.primary[400]} !important`,
            },
            "& .MuiAccordionDetails-root": {
              background: `${colors.primary[400]} !important`,
            },
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreOutlinedIcon />}>
            <Typography
              color={colors.greenAccent[500]}
              variant="h6"
              fontWeight={700}
            >
              The device is not powering on or frequently disconnects.
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            Check the power source and cables for any damage. Ensure the device
            is properly plugged in and receiving power.
          </AccordionDetails>
        </Accordion>

        {/* Water flow disruption */}
        <Accordion
          sx={{
            "& .MuiAccordionSummary-root": {
              background: `${colors.primary[400]} !important`,
            },
            "& .MuiAccordionDetails-root": {
              background: `${colors.primary[400]} !important`,
            },
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreOutlinedIcon />}>
            <Typography
              color={colors.greenAccent[500]}
              variant="h6"
              fontWeight={700}
            >
              Inconsistent or no water flow in the system.
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            Check for blockages in pipes or pumps. Ensure the water level is
            adequate and pumps are functioning correctly.
          </AccordionDetails>
        </Accordion>
        {/* App pairing issues */}
        <Accordion
          sx={{
            "& .MuiAccordionSummary-root": {
              background: `${colors.primary[400]} !important`,
            },
            "& .MuiAccordionDetails-root": {
              background: `${colors.primary[400]} !important`,
            },
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreOutlinedIcon />}>
            <Typography
              color={colors.greenAccent[500]}
              variant="h6"
              fontWeight={700}
            >
              Difficulty in pairing the device with the mobile app.
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            Ensure that Wi-Fi is enabled on your smartphone. Follow the app's
            pairing instructions closely.
          </AccordionDetails>
        </Accordion>
        {/* Firmware Update Failure */}
        <Accordion
          sx={{
            "& .MuiAccordionSummary-root": {
              background: `${colors.primary[400]} !important`,
            },
            "& .MuiAccordionDetails-root": {
              background: `${colors.primary[400]} !important`,
            },
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreOutlinedIcon />}>
            <Typography
              color={colors.greenAccent[500]}
              variant="h6"
              fontWeight={700}
            >
              Unable to complete firmware updates.
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            Ensure stable internet connectivity. Try restarting the device and
            initiating the update again. If problems persist, please contact the
            technical team for assistance.
          </AccordionDetails>
        </Accordion>
        {/* User Interface Glitches */}
        <Accordion
          sx={{
            "& .MuiAccordionSummary-root": {
              background: `${colors.primary[400]} !important`,
            },
            "& .MuiAccordionDetails-root": {
              background: `${colors.primary[400]} !important`,
            },
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreOutlinedIcon />}>
            <Typography
              color={colors.greenAccent[500]}
              variant="h6"
              fontWeight={700}
            >
              The display or app interface is unresponsive or glitchy.
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            Restart the device. If using an app, clear the app cache or
            reinstall the app.
          </AccordionDetails>
        </Accordion>
        {/* Environmental Setting Errors */}
        <Accordion
          sx={{
            "& .MuiAccordionSummary-root": {
              background: `${colors.primary[400]} !important`,
            },
            "& .MuiAccordionDetails-root": {
              background: `${colors.primary[400]} !important`,
            },
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreOutlinedIcon />}>
            <Typography
              color={colors.greenAccent[500]}
              variant="h6"
              fontWeight={700}
            >
              Incorrect settings for plant or fish growth.
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            Consult the Aquafusion manual for optimal environmental settings.
            Adjust the settings according to the specific needs of your plants
            and fish.
          </AccordionDetails>
        </Accordion>
      </Box>
      <Box mt="25px" ml="25px">
        <Button
          variant="filled"
          color={colors.grey[100]}
          sx={{
            borderColor: "inherit",
            color: "#ffffff",
          }}
          onClick={routeChange}
        >
          About AquaFusion
        </Button>
      </Box>
    </Box>
  );
};

export default TechnicalSupport;
