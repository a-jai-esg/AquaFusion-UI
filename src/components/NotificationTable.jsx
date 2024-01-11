import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, CircularProgress, Typography, Button } from "@mui/material";
import axios from "axios";

const NotificationTable = () => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 4; // Limit to 3 rows
  const [notificationData, setNotificationData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://us-central1-aquafusion-b8744.cloudfunctions.net/api/farmadmin/administrative/get_todays_notifications",
        {
          emailAddress: localStorage.getItem("emailAddress"),
          password: localStorage.getItem("password"),
        }
      );

      if (response.data === null) {
        throw new Error("No data received");
      }

      const dataWithIds = response.data.map((row, index) => ({
        ...row,
        id: index + 1,
      }));

      const newStartIndex = (currentPage - 1) * itemsPerPage;
      const limitedData = dataWithIds.slice(
        newStartIndex,
        newStartIndex + itemsPerPage
      );

      setNotificationData(limitedData);
      setStartIndex(newStartIndex);
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  const userData = JSON.parse(localStorage.getItem("userData"));

  const columns = [
    {
      field: "notificationId",
      flex: 2,
      minWidth: 150,
      headerName: "Notification ID",
      fontWeight: "bold",
    },
    {
      field: "notificationTimestamp",
      flex: 2,
      minWidth: 100,
      headerName: "Timestamp",
      cellClassName: "date-column--cell",
    },
    {
      field: "notificationDate",
      flex: 2,
      minWidth: 100,
      headerName: "Date",
      cellClassName: "date-column--cell",
    },
    {
      field: "notificationTitle",
      flex: 2,
      minWidth: 350,
      headerName: "Notification Title",
      cellClassName: "title-column--cell",
    },
    {
      field: "notificationDescription",
      flex: 2,
      minWidth: 400,
      headerName: "Notification Description",
      cellClassName: "description-column--cell",
    },
  ];

  return (
    <Box mt={2}>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <CircularProgress sx={{ ml: "20vh", mr: "auto", color: "#c2c2c2" }} />
          <Typography variant="h6" ml={2}>
            Loading notifications for {`${userData.workgroupId}`}...
          </Typography>
        </Box>
      ) : (
        <DataGrid
          rows={notificationData.slice(startIndex, startIndex + itemsPerPage)}
          columns={columns}
          autoeight
          pageSize={itemsPerPage}
          page={currentPage - 1}
          onPageChange={(newPage) => setCurrentPage(newPage + 1)}
        />
      )}
    </Box>
  );
};

export default NotificationTable;
