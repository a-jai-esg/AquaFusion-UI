import { useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import LineChartComponent from "../../components/LineChartComponent";

const TerrestrialSensorStatus = () => {
  useEffect(() => {
    document.title = "Terrestrial Sensor Status";
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
          parseFloat(data.temperature) ||
          parseFloat(data.humidity) ||
          parseFloat(data.distance),
      }));
    }
    return [];
  };

  const humidityData = processData("2"); // Humidity
  const airTemperatureData = processData("3"); // Air Temperature
  const ultrasonicTerrestrialData = processData("4"); // Ultrasonic Terrestrial

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
              data={airTemperatureData}
              dataKey="value"
              timestamp="timestamp"
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
              data={humidityData}
              dataKey="value"
              timestamp="timestamp"
              graphTitle="Air Humidity (%)"
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
            data={ultrasonicTerrestrialData}
            dataKey="value"
            timestamp="timestamp"
            graphTitle="Plant Growth (cm)"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default TerrestrialSensorStatus;
