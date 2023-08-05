import { useEffect } from "react";
import { Typography, Box, useTheme, Button } from "@mui/material";
import { tokens } from "../../theme";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";

const ManageWorkgroup = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    document.title = "Manage Workgroup";
  }, []);

  const customToolBar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  };

  const columns = [
    {
      field: "id",
      headerName: "Member ID",
      fontWeight: "bold",
    },
    {
      field: "name",
      flex: 1,
      headerName: "Name",
      editable: true,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      flex: 1,
      headerName: "Email Address",
      editable: true,
      cellClassName: "email-column--cell",
    },
    {
      field: "age",
      headerName: "Member's Age",
      type: "number",
      editable: true,
      headerAlign: "left",
      align: "left",
      cellClassName: "age-column--cell",
    },
    {
      field: "phone",
      editable: true,
      headerName: "Phone Number",
    },
    {
      field: "access",
      headerName: "System Privileges",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
  ];

  return (
    <Box m="20px;">
      <Header
        title="Manage Workgroup"
        subtitle="Set and view team privileges"
      />
      <Box
        m="40px 0 0 0"
        h="70vh"
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
  );
};

export default ManageWorkgroup;
