import { useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Clock = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  let time = new Date().toLocaleTimeString();
  const [clockTime, setTime] = useState(time);

  const updateTime = () => {
    time = new Date().toLocaleTimeString();
    setTime(time);
  };

  setInterval(updateTime);

  return (
    <Box
      display="flex"
      backgroundColor={colors.primary[400]}
      borderRadius="5px"
      padding="5px"
    >
      <Typography variant="h3" color={colors.primary[100]} fontWeight="400">
        {clockTime}
      </Typography>
    </Box>
  );
};

export default Clock;
