import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, useTheme } from "@mui/material";
import CheckBoxOutlined from "@mui/icons-material/CheckBoxOutlined";
import { tokens } from "../../theme";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { mockDataTeam } from "../../data/mockData";
import Header from "../../components/Header";

const ApproveRegistrationRequests = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    document.title = "Register Farmer";
  }, []);

  const customToolBar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  };

  let navigate = useNavigate();

  const routeChange = () => {
    navigate("/register-farmer/");
  };

  const columns = [
    {
      field: "id",
      headerName: "Member ID",
      fontWeight: "bold",
    },
    {
      field: "name",
      flex: 3,
      headerName: "Name",
      editable: true,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
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
          onClick={() => handleApprove(params.id)}
          variant="contained"
          color="secondary"
          marginLeft="50%"
        >
          Approve Request
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
          <DataGrid
            editMode="row"
            rows={mockDataTeam}
            columns={columns}
            components={{ Toolbar: customToolBar }}
          ></DataGrid>
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

export default ApproveRegistrationRequests;
