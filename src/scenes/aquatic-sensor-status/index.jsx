import { useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import LineChartComponent from "../../components/LineChartComponent";

const AquaticSensorStatus = () => {
  useEffect(() => {
    document.title = "Aquatic Sensor Status";
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const systemData = JSON.parse(localStorage.getItem("systemData")) || {};

  // Function to process and parse data for the charts
  const processData = (dataKey) => {
    if (systemData[dataKey]) {
      return systemData[dataKey].map((data) => ({
        timestamp: data.timestamp,
        value:
          parseFloat(data.ph_level) ||
          parseFloat(data.temperature) ||
          parseFloat(data.ppm) ||
          parseFloat(data.distance),
      }));
    }
    return [];
  };

  const phData = processData("0"); // pH
  const tdsData = processData("1"); // TDS
  const waterTemperatureData = processData("3"); // Water Temperature
  const ultrasonicWaterData = processData("5"); // Ultrasonic Water/ Volume

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
              data={waterTemperatureData}
              dataKey="value"
              timestamp="timestamp"
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
              data={ultrasonicWaterData}
              dataKey="value"
              timestamp="timestamp"
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
          <LineChartComponent
            data={phData}
            dataKey="value"
            timestamp="timestamp"
            graphTitle="pH Level"
          />
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
            data={tdsData}
            dataKey="value"
            timestamp="timestamp"
            graphTitle="Total Dissolved Solids (ppm)"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AquaticSensorStatus;
