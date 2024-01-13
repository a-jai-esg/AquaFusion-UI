import React, { useEffect, useState } from "react";
import { Box, CircularProgress, useTheme } from "@mui/material";
import Header from "../../components/Header";
import LineChartComponent from "../../components/LineChartComponent";
import NotificationTable from "../../components/NotificationTable";
import { notificationDataToday } from "../../data/mockLineData";
import { tokens } from "../../theme";
import { DateTime } from "luxon";
import axios from "axios"; // Import axios for API calls
import _ from "lodash";

const Dashboard = () => {
  const [aquaticData, setAquaticData] = useState({});
  const [terrestrialData, setTerrestrialData] = useState({});
  const [loading, setLoading] = useState(true);

  const getLocaleDateString = (date) => {
    return date.toFormat("MM/dd/yyyy");
  };

  const dateNow = getLocaleDateString(DateTime.now().setZone("Asia/Manila"));

  // Data URLs
  const dataURLs = [
    "https://us-central1-aquafusion-b8744.cloudfunctions.net/api/system/administrative/get_system_aquatic_values",
    "https://us-central1-aquafusion-b8744.cloudfunctions.net/api/system/administrative/get_system_terrestrial_values",
  ];

  useEffect(() => {
    document.title = "Dashboard";

    // Fetch aquatic data
    axios
      .post(dataURLs[0], {
        emailAddress: localStorage.getItem("emailAddress"),
        password: localStorage.getItem("password"),
        startDate: dateNow,
        endDate: dateNow,
      })
      .then((response) => {
        if (response.status === 200) {
          setAquaticData(response.data);

          // Save aquaticData to local storage
          localStorage.setItem("aquaticData", JSON.stringify(response.data));
        }
      })
      .catch((error) => {
        console.error("Failed to fetch aggregated aquatic data:", error);
      });

    // Fetch terrestrial data
    axios
      .post(dataURLs[1], {
        emailAddress: localStorage.getItem("emailAddress"),
        password: localStorage.getItem("password"),
        startDate: dateNow,
        endDate: dateNow,
      })
      .then((response) => {
        if (response.status === 200) {
          setTerrestrialData(response.data);

          // Save terrestrialData to local storage
          localStorage.setItem(
            "terrestrialData",
            JSON.stringify(response.data)
          );
        }
      })
      .catch((error) => {
        console.error("Failed to fetch aggregated terrestrial data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); // Empty dependency array to run only once on component mount

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Parse the object in the form of data from localStorage
  const aquaticSensorData =
    JSON.parse(localStorage.getItem("aquaticData")) || {};

  const terrestrialSensorData =
    JSON.parse(localStorage.getItem("terrestrialData")) || {};

  // Function to process and parse aquatic data for the chart
  const aquaticProcessData = (dataKey) => {
    if (aquaticSensorData[dataKey]) {
      return aquaticSensorData[dataKey].map((data) => ({
        timestamp: data.timestamp,
        value: parseFloat(data.temperature) || 0,
      }));
    }
    return [];
  };

  // Function to process and parse terrestrial data for the chart
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

  const waterTemperatureData = _.reverse(aquaticProcessData(3)); // Water Temperature
  const airTemperatureData = _.reverse(terrestrialProcessData(1)); // Air Temperature
  const airHumidityData = _.reverse(terrestrialProcessData(0)); // Humidity

  const userData = JSON.parse(localStorage.getItem("userData")) || {};

  const helloMessage = `Howdy, Admin ${userData.fullName || ""}!`;
  if (loading) {
    // Display circular progress indicator with animation while data is still being fetched
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        flexDirection="column"
      >
        <CircularProgress
          sx={{ color: colors.primary[200], marginBottom: 2 }}
          size={40}
          thickness={4}
        />
        <div>Loading AquaFusion Dashboard...</div>
      </Box>
    );
  }

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
              dataKey="value"
              timestamp="timestamp"
              graphTitle="Water Temperature (°C)"
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
              dataKey="value"
              timestamp="timestamp"
              graphTitle="Air Temperature (°C)"
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
              data={airHumidityData}
              dataKey="value"
              timestamp="timestamp"
              graphTitle="Air Humidity (%)"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
