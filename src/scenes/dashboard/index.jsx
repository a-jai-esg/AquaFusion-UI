import { useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import LineChartComponent from "../../components/LineChartComponent";
import {
  aquaticSensorData,
  dateData,
  notificationDataToday,
} from "../../data/mockLineData";
import NotificationTable from "../../components/NotificationTable";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Dashboard" subtitle="Today's Activity" />
      </Box>
      <Box>
        <Box display="flex" justifyContent="space-between">
          {/* Line Graph */}
          <Box
            flex="1 1 20%"
            backgroundColor={colors.primary[400]}
            p="15px"
            borderRadius="4px"
          >
            <LineChartComponent
              data={aquaticSensorData}
              graphTitle="Water Temperature"
            />
          </Box>

          {/* Notification Box */}
          <Box
            flex="1 1 80%"
            ml="15px"
            h="100vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: colors.greenAccent[300],
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.blueAccent[700],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[700],
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[700],
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${colors.grey[100]}`,
              },
            }}
          >
            <NotificationTable notificationDataToday={notificationDataToday} />
          </Box>
        </Box>
        <Box pt="20px" display="flex" justifyContent="space-between">
          {/* Line Graph */}
          <Box
            flex="1 1 50%"
            backgroundColor={colors.primary[400]}
            p="15px"
            ml="auto"
            mr="auto"
            borderRadius="4px"
          >
            <LineChartComponent data={dateData} graphTitle="Air Temperature" />
          </Box>
          <Box
            flex="1 1 50%"
            backgroundColor={colors.primary[400]}
            p="15px"
            ml="15px"
            mr="auto"
            borderRadius="4px"
          >
            <LineChartComponent
              data={aquaticSensorData}
              graphTitle="Air Humidity"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
