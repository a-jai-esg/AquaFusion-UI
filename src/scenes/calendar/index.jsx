import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const calendar = ({ dates }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="25px">
      <Header title="Calendar" subtitle="View History"></Header>
      {console.log(dates)}
    </Box>
  );
};

export default calendar;
