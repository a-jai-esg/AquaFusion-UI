import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  useTheme,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarExport,
} from "@mui/x-data-grid";
import Header from "../../components/Header";

const ManageWorkgroup = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const userData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    document.title = "Manage Farmers";
    fetchData(); // fetch data
  }, []);

  // get all verified farmers in a workgroup endpoint
  const fetchVerifiedFarmersURL =
    "https://us-central1-aquafusion-b8744.cloudfunctions.net/api/farmadmin/administrative/get_verified_farmers_by_workgroup";

  // this method will handle the fetching of data
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.post(fetchVerifiedFarmersURL, {
        emailAddress: localStorage.getItem("emailAddress"),
        password: localStorage.getItem("password"),
      });
      if (response.data === null) {
        throw null;
      }
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  // this method will handle the deletion of the farmer's account
  const handleDelete = async (farmerEmailAddress) => {
    setLoading(true); // Set loading state to true to show the animation
    try {
      const workgroupId = userData.workgroupId;

      const farmerDeletionURL = `https://us-central1-aquafusion-b8744.cloudfunctions.net/api/farmadmin/administrative/delete_farmer_account`;
      await axios.post(farmerDeletionURL, {
        emailAddress: localStorage.getItem("emailAddress"),
        password: localStorage.getItem("password"),
        workgroupId: workgroupId,
        farmerEmailAddress: farmerEmailAddress,
      });
      fetchData(); // Refresh data after delete
    } catch (error) {
      console.error("Error deleting data: ", error);
    } finally {
      setLoading(false); // Set loading state to false after the operation
    }
  };

  const customToolBar = () => (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  );

  const columns = [
    {
      field: "accountId",
      flex: 2,
      maxWidth: 300,
      headerName: "Account ID",
      fontWeight: "bold",
    },
    {
      field: "fullName",
      flex: 2,
      maxWidth: 400,
      headerName: "Name",
      editable: true,
      cellClassName: "name-column--cell",
    },
    {
      field: "emailAddress",
      flex: 2,
      maxWidth: 500,
      headerName: "Email Address",
      editable: true,
      cellClassName: "email-column--cell",
    },
    {
      field: "delete",
      flex: 2,
      maxWidth: 300,
      headerName: "Delete Farmer",
      renderCell: (params) => (
        <Button
          onClick={() => handleDelete(params.row.emailAddress)}
          variant="contained"
          color="secondary"
        >
          Delete Account
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="Manage Workgroup"
          subtitle={`Workgroup management options for ${userData.workgroupId}`}
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
                Getting a list of Farmers for {userData.workgroupId}...
              </Typography>
            </Box>
          ) : (
            <DataGrid
              editMode="row"
              rows={data}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[10]}
              components={{ Toolbar: customToolBar }}
              getRowId={(row) => row.accountId}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ManageWorkgroup;
