import { useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import LineChartComponent from "../../components/LineChartComponent";
import { aquaticSensorData, dateData } from "../../data/mockLineData";

const TerrestrialSensorStatus = () => {
  useEffect(() => {
    document.title = "Terrestrial Sensor Status";
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Box display="flex" justifycontent="space-between" alignItems="center">
        <Header
          title="Terrestrial Sensor Status"
          subtitle="View plant growth, air humidity and air temperature"
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
              graphTitle="Air Temperature (°C)"
            />
          </Box>
          <Box
            flex="1 1 50%"
            backgroundColor={colors.primary[400]}
            ml="10px"
            mr="auto"
            p="10px"
            borderRadius="4px"
          >
            <LineChartComponent
              data={dateData}
              graphTitle="Air Humidity (g/m3)"
            />
          </Box>
        </Box>
      </Box>
      <Box pt="20px" display="flex" justifyContent="space-between">
        {/* Line Graph */}
        <Box
          flex="1 1 100%"
          backgroundColor={colors.primary[400]}
          p="10px"
          ml="10px"
          mr="auto"
          borderRadius="4px"
        >
          <LineChartComponent
            data={dateData}
            graphTitle="Plant Growth Statistics"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default TerrestrialSensorStatus;
