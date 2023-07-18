import { Box, useTheme, Typography } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { tokens } from "../../theme";

const TechnicalSupport = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="25px">
      <Header
        title="Technical Support"
        subtitle="Call hotlines 123-4567 for additional support"
      ></Header>

      {/* Fails to update */}
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
            My Aquaponics System fails to update.
          </Typography>
        </AccordionSummary>
        <AccordionDetails></AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default TechnicalSupport;
