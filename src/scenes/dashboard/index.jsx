import React, { useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import LineChartComponent from "../../components/LineChartComponent";
import NotificationTable from "../../components/NotificationTable";
import { notificationDataToday } from "../../data/mockLineData";
import { tokens } from "../../theme";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const userData = JSON.parse(localStorage.getItem("userData")) || {};
  const systemData = JSON.parse(localStorage.getItem("systemData")) || {};

  // Function to process and parse data for the charts
  const processData = (dataKey) => {
    if (systemData[dataKey]) {
      return systemData[dataKey].map((data) => ({
        timestamp: data.timestamp,
        value:
          parseFloat(data.humidity) ||
          parseFloat(data.temperature) ||
          parseFloat(data.waterTemperature),
      }));
    }
    return [];
  };

  const waterTemperatureData = processData("3"); // Water Temperature
  const airTemperatureData = processData("6"); // Air Temperature
  const humidityData = processData("2"); // Humidity

  const helloMessage = `Howdy, Admin ${userData.fullName || ""}!`;
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Dashboard" subtitle={helloMessage} />
      </Box>
      <Box>
        <Box pt="10px" display="flex" justifyContent="space-between">
          {/* Water Temperature Graph */}
          <Box
            flex="1 1 30%"
            backgroundColor={colors.primary[400]}
            p="15px"
            borderRadius="4px"
          >
            <LineChartComponent
              data={waterTemperatureData}
              dataKey="value" // Make sure this matches the key in your data
              timestamp="timestamp" // Make sure this matches the key in your data
              graphTitle="Water Temperature"
            />
          </Box>

          {/* Notification Box */}
          <Box
            display="flex"
            flex="1 1 80%"
            backgroundColor={colors.primary[400]}
            padding="15px"
            ml="15px"
            h="100vh"
            sx={{
              "& .MuiDataGrid-root": { border: "none" },
              "& .MuiDataGrid-cell": { borderBottom: "none" },
              "& .name-column--cell": { color: colors.greenAccent[300] },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.blueAccent[700],
                borderBottom: "none",
              },
            }}
          >
            {/* Use NotificationTable component here */}
            <NotificationTable
              notificationData={notificationDataToday}
              isDefault={false}
            />
          </Box>
        </Box>
        <Box pt="20px" display="flex" justifyContent="space-between">
          {/* Air Temperature Graph */}
          <Box
            flex="1 1 50%"
            backgroundColor={colors.primary[400]}
            p="15px"
            ml="auto"
            mr="auto"
            borderRadius="4px"
          >
            <LineChartComponent
              data={airTemperatureData}
              dataKey="value" // Make sure this matches the key in your data
              timestamp="timestamp" // Make sure this matches the key in your data
              graphTitle="Air Temperature"
            />
          </Box>
          {/* Humidity Graph */}
          <Box
            flex="1 1 50%"
            backgroundColor={colors.primary[400]}
            p="15px"
            ml="15px"
            mr="auto"
            borderRadius="4px"
          >
            <LineChartComponent
              data={humidityData}
              dataKey="value" // Make sure this matches the key in your data
              timestamp="timestamp" // Make sure this matches the key in your data
              graphTitle="Air Humidity"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
