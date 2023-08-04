import { useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import LineChartComponent from "../../components/LineChartComponent";
import { aquaticSensorData, dateData } from "../../data/mockLineData";

const AquaticSensorStatus = () => {
  useEffect(() => {
    document.title = "Aquatic Sensor Status";
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Box display="flex" justifycontent="space-between" alignItems="center">
        <Header
          title="Aquatic Sensor Status"
          subtitle="View water volume, pH Level, TDS Levels, and water temperature."
        />
      </Box>
      <Box>
        <Box display="flex" justifyContent="space-between">
          {/* Line Graph */}
          <Box
            flex="1 1 50%"
            backgroundColor={colors.primary[400]}
            p="10px"
            ml="10px"
            mr="10px"
            borderRadius="4px"
          >
            <LineChartComponent
              data={aquaticSensorData}
              graphTitle="Water Temperature (°C)"
            />
          </Box>
          <Box
            flex="1 1 50%"
            backgroundColor={colors.primary[400]}
            ml="10px"
            mr="10px"
            p="10px"
            borderRadius="4px"
          >
            <LineChartComponent
              data={dateData}
              graphTitle="Water Volume (Liters)"
            />
          </Box>
        </Box>
      </Box>
      <Box pt="20px" display="flex" justifyContent="space-between">
        {/* Line Graph */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="10px"
          ml="10px"
          mr="10px"
          borderRadius="4px"
        >
          <LineChartComponent data={dateData} graphTitle="pH Level" />
        </Box>
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="10px"
          ml="10px"
          mr="10px"
          borderRadius="4px"
        >
          <LineChartComponent
            data={aquaticSensorData}
            graphTitle="Total Dissolved Solids (ppm)"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AquaticSensorStatus;
