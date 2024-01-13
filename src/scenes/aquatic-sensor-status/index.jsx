import React, { useState, useEffect } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import LineChartComponent from "../../components/LineChartComponent";
import DownloadAquaticBacklogModal from "../../components/modals/DownloadAquaticBacklogModal";
import _ from "lodash";

const AquaticSensorStatus = () => {
  useEffect(() => {
    document.title = "Aquatic Sensor Status";
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Parse the stringified JSON from localStorage
  const aquaticSensorData =
    JSON.parse(localStorage.getItem("aquaticData")) || {};

  // Function to process and parse aquatic data for the chart
  const aquaticProcessData = (dataKey) => {
    if (aquaticSensorData[dataKey]) {
      return aquaticSensorData[dataKey].map((data) => ({
        timestamp: data.timestamp,
        value:
          parseFloat(data.ph_level) ||
          parseFloat(data.ppm) ||
          parseFloat(data.distance) ||
          parseFloat(data.temperature),
      }));
    }
    return [];
  };

  const phData = _.reverse(aquaticProcessData(0)); // pH
  const tdsData = _.reverse(aquaticProcessData(1)); // TDS
  const waterTemperatureData = _.reverse(aquaticProcessData(3)); // Water Temperature
  const ultrasonicWaterData = _.reverse(aquaticProcessData(2)); // Ultrasonic Water/ Volume

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
          title="Aquatic Sensor Status"
          subtitle="View pH level, TDS levels, water level, and water temperature."
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ mr: "8px" }}
          onClick={handleDownloadModalOpen}
        >
          Download Aquatic Data Backlog
        </Button>
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
              graphTitle="Water Level (cm)"
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

      {/* Download Backlog Modal */}
      <DownloadAquaticBacklogModal
        isOpen={isDownloadModalOpen}
        onRequestClose={handleDownloadModalClose}
        onDownloadBacklog={() => {
          // Add any specific logic if needed
        }}
      />
    </Box>
  );
};

export default AquaticSensorStatus;
