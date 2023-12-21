import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  useTheme,
  CircularProgress,
  Typography,
} from "@mui/material";
import { tokens } from "../../theme";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarExport,
} from "@mui/x-data-grid";
import Header from "../../components/Header";

const ApproveRegistrationRequest = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const userData = JSON.parse(localStorage.getItem("userData"));

  let navigate = useNavigate();

  useEffect(() => {
    document.title = "Register Farmer";
    fetchData(); // fetch data
  }, []);

  // get all verified farmers in a workgroup endpoint
  const fetchAllFarmersInWorkgroupURL =
    "https://us-central1-aquafusion-b8744.cloudfunctions.net/api/farmadmin/administrative/get_unverified_farmers_by_workgroup";

  // this method will handle the fetching of data
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.post(fetchAllFarmersInWorkgroupURL, {
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

  // this method will handle the deletion of the farmer's account
  const handleApprove = async (farmerEmailAddress) => {
    setLoading(true); // Set loading state to true to show the animation
    try {
      const workgroupId = userData.workgroupId;

      const farmerApprovalURL = `https://us-central1-aquafusion-b8744.cloudfunctions.net/api/farmadmin/administrative/approve_farmer_account`;
      await axios.post(farmerApprovalURL, {
        emailAddress: localStorage.getItem("emailAddress"),
        password: localStorage.getItem("password"),
        farmerEmailAddress: farmerEmailAddress,
      });
      fetchData(); // Refresh data after delete
    } catch (error) {
      console.error("Error deleting data: ", error);
    } finally {
      setLoading(false); // Set loading state to false after the operation
    }
  };

  const customToolBar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  };

  const routeChange = () => {
    let path = "/register-farmer/";
    navigate(path);
  };

  const columns = [
    {
      field: "accountId",
      flex: 2,
      headerName: "Account ID",
      fontWeight: "bold",
    },
    {
      field: "fullName",
      flex: 2,
      headerName: "Name",
      editable: true,
      cellClassName: "name-column--cell",
    },
    {
      field: "emailAddress",
      flex: 2,
      headerName: "Email Address",
      editable: true,
      cellClassName: "email-column--cell",
    },
    {
      field: "Approve",
      flex: 1,
      headerName: "Approve Registration Request",
      width: 200,
      renderCell: (params) => (
        <Button
          onClick={() => handleApprove(params.row.emailAddress)}
          variant="contained"
          color="secondary"
          marginLeft="50%"
        >
          Approve to Workgroup
        </Button>
      ),
    },
    {
      field: "Delete",
      flex: 1,
      headerName: "Delete Registration Request",
      width: 200,
      renderCell: (params) => (
        <Button
          onClick={() => handleDelete(params.row.emailAddress)}
          variant="contained"
          color="secondary"
          marginLeft="50%"
        >
          Delete Request
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="Pending Account Approvals"
        subtitle="View farmer registration requests to your workgroup."
      />
      <Box marginTop="10px" p="10px" backgroundColor={colors.primary[400]}>
        <Box
          m="10px 0 0 0"
          h="50vh"
          p="30px"
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
                Getting a list of unverified farmers for {userData.workgroupId}
                ...
              </Typography>
            </Box>
          ) : (
            <DataGrid
              editMode="row"
              rows={data}
              columns={columns}
              components={{ Toolbar: customToolBar }}
              getRowId={(row) => row.accountId}
            />
          )}
        </Box>
      </Box>
      <Box mt="15px" ml="10px">
        <Button
          variant="filled"
          color={colors.grey[100]}
          sx={{
            borderColor: "inherit",
            color: "#ffffff",
          }}
          onClick={routeChange}
        >
          Return to Farmer Registration
        </Button>
      </Box>
    </Box>
  );
};

export default ApproveRegistrationRequest;
