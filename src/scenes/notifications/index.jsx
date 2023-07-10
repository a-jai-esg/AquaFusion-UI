import { useEffect } from "react";
import { Box } from "@mui/material";
import { tokens } from "../../theme";
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton} from "@mui/x-data-grid";
import { mockDataContacts } from "../../data/mockData";
import { useTheme } from "@mui/material";
import Header from "../../components/Header";

const Notifications = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    document.title = "Notifications";
  }, []);

  const customToolBar =  () => {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton/>
        <GridToolbarExport/>
        <GridToolbarFilterButton/>
      </GridToolbarContainer>
    );
  }

  const columns = [
    {
      field: "id",
      flex: 0.5,
      type: "number",
      headerName: "ID",
      fontWeight: "bold",
    },
    {
      field: "name",
      flex: 2,
      headerName: "Name",
      fontWeight: "bold",
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      flex: 1,
      headerName: "Email Address",
      cellClassName: "email-column--cell",
    },
    {
      flex: 0.5,
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
      cellClassName: "age-column--cell",
    },
    {
      field: "phone",
      headerName: "Phone Number",
    },
    {
      field: "address",
      flex: 1,
      headerName: "Address",
    },
    {
      field: "city",
      flex: 0.5,
      headerName: "City",
    },
    {
      field: "zipCode",
      flex: 0.5,
      headerName: "Zip Code",
    },
    {
      field: "registrarId",
      headerName: "Registrar ID",
      flex: 0.5,
      type: "number",
      cellClassName: "registrar-id-column--cell",
    },
  ];

  return (
    <Box m="20px;">
      <Header title="Notifications" subtitle="View and Manage Notifications" />
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
            color: `${colors.grey[100]}`
          },
        }}
      >
        <DataGrid rows={mockDataContacts} columns={columns} components={{Toolbar: customToolBar}}></DataGrid>
      </Box>
    </Box>
  );
};

export default Notifications;
