import { useEffect } from "react";
import { Box } from "@mui/material";
import Header from "../../components/Header";

const AdjustThresholds = () => {
  useEffect(() => {
    document.title = "Adjust System Thresholds";
  }, []);

  return (
    <Box m="20px">
      <Box display="flex" justifycontent="space-between" alignItems="center">
        <Header
          title="Adjust System Thresholds"
          subtitle="Adjust system's pH Level, TDS Levels, etc."
        />
      </Box>
    </Box>
  );
};

export default AdjustThresholds;
