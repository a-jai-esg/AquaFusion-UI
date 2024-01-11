import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  useTheme,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { tokens } from "../../theme";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";
import Header from "../../components/Header";
import DownloadBacklogModal from "../../components/modals/DownloadBacklogModal";

const Notifications = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDownloadModal, setShowDownloadModal] = useState(false); // State for modal visibility

  const itemsPerPage = 10;

  const userData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    document.title = "System Notifications";
    fetchData();
  }, [currentPage]);

  const getNotificationsURL =
    "https://us-central1-aquafusion-b8744.cloudfunctions.net/api/farmadmin/administrative/get_all_notifications";

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.post(getNotificationsURL, {
        emailAddress: localStorage.getItem("emailAddress"),
        password: localStorage.getItem("password"),
      });
      if (response.data === null) {
        throw null;
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

      setData(limitedData);
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleDownloadModal = () => {
    setShowDownloadModal(!showDownloadModal);
  };

  const customToolBar = () => (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <Button
        variant="contained"
        color="primary"
        onClick={handleToggleDownloadModal}
      >
        Download Backlogs
      </Button>
    </GridToolbarContainer>
  );

  const columns = [
    {
      field: "notificationId",
      flex: 1,
      minWidth: 300,
      maxWidth: 400,
      headerName: "Notification ID",
      fontWeight: "bold",
    },
    {
      field: "notificationTimestamp",
      flex: 1,
      minWidth: 150,
      headerName: "Timestamp",
      cellClassName: "date-column--cell",
    },
    {
      field: "notificationDate",
      flex: 1,
      minWidth: 150,
      headerName: "Date",
      cellClassName: "date-column--cell",
    },
    {
      field: "notificationTitle",
      flex: 2,
      maxWidth: 400,
      headerName: "Title",
      cellClassName: "title-column--cell",
    },
    {
      field: "notificationDescription",
      flex: 2,
      maxWidth: 500,
      headerName: "Description",
      cellClassName: "description-column--cell",
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="Notifications"
          subtitle={`Showing the latest notifications for ${userData.workgroupId}`}
        />
      </Box>
      <Box pt="20px" display="flex" justifyContent="space-between">
        <Box
          h="50vh"
          p="30px"
          flex="1 1 50%"
          ml="auto"
          mr="auto"
          backgroundColor={colors.primary[400]}
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
          {loading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              <CircularProgress sx={{ color: colors.primary[200] }} />
              <Typography variant="h6" sx={{ ml: 2 }}>
                Getting notifications for {userData.workgroupId}...
              </Typography>
            </Box>
          ) : (
            <DataGrid
              editMode="row"
              rows={data}
              columns={columns}
              components={{ Toolbar: customToolBar }}
              getRowId={(row) => row.notificationId}
              pageSize={itemsPerPage}
              page={currentPage - 1}
              onPageChange={(newPage) => setCurrentPage(newPage + 1)}
              autoHeight
            />
          )}
        </Box>
      </Box>

      {/* Render the DownloadBacklogModal component based on modal visibility state */}
      <DownloadBacklogModal
        isOpen={showDownloadModal}
        onRequestClose={handleToggleDownloadModal}
        onDownloadBacklog={(startDate, endDate) => {
          // Add logic for handling download backlog with startDate and endDate
          console.log(
            "Downloading notification backlogs from " +
              startDate +
              " to " +
              endDate
          );
        }}
      />
    </Box>
  );
};

export default Notifications;
