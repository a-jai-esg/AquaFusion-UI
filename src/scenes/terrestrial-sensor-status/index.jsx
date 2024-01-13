import React, { useState, useEffect } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import LineChartComponent from "../../components/LineChartComponent";
import DownloadTerrestrialBacklogModal from "../../components/modals/DownloadTerrestrialBacklogModal";
import _ from "lodash";

const TerrestrialSensorStatus = () => {
  useEffect(() => {
    document.title = "Terrestrial Sensor Status";
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const terrestrialSensorData =
    JSON.parse(localStorage.getItem("terrestrialData")) || {};

  const terrestrialProcessData = (dataKey) => {
    if (terrestrialSensorData[dataKey]) {
      return terrestrialSensorData[dataKey].map((data) => ({
        timestamp: data.timestamp,
        value:
          parseFloat(data.humidity) ||
          parseFloat(data.temperature) ||
          parseFloat(data.distance) ||
          0,
      }));
    }
    return [];
  };

  const humidityData = _.reverse(terrestrialProcessData(0));
  const airTemperatureData = _.reverse(terrestrialProcessData(1));
  const ultrasonicTerrestrialData = _.reverse(terrestrialProcessData(2));

  const [isDownloadModalOpen, setDownloadModalOpen] = useState(false);

  const handleDownloadModalOpen = () => {
    setDownloadModalOpen(true);
  };

  const handleDownloadModalClose = () => {
    setDownloadModalOpen(false);
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="Terrestrial Sensor Status"
          subtitle="View plant growth, air humidity and air temperature"
        />
        {/* Move the Button to the right by adjusting the layout */}
        <Box>
          <Button
            variant="contained"
            color="primary"
            sx={{ ml: "auto" }}
            onClick={handleDownloadModalOpen}
          >
            Download Terrestrial Data Backlog
          </Button>
        </Box>
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

      {/* Download Backlog Modal */}
      <DownloadTerrestrialBacklogModal
        isOpen={isDownloadModalOpen}
        onRequestClose={handleDownloadModalClose}
        onDownloadBacklog={() => {
          // Add any specific logic if needed
        }}
      />
    </Box>
  );
};

export default TerrestrialSensorStatus;
