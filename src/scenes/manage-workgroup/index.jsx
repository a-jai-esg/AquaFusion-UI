import { useEffect } from "react";
import { Box, useTheme, Button } from "@mui/material";
import { tokens } from "../../theme";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { mockDataTeam } from "../../data/mockData";
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
      flex: 2,
      maxWidth: 300,
      headerName: "Member ID",
      fontWeight: "bold",
    },
    {
      field: "name",
      flex: 2,
      maxWidth: 400,
      headerName: "Name",
      editable: true,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
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
          onClick={() => handleDelete(params.id)}
          variant="contained"
          color="secondary"
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="Manage Workgroup"
          subtitle="Set and view team privileges"
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
          <DataGrid
            editMode="row"
            rows={mockDataTeam}
            columns={columns}
            components={{ Toolbar: customToolBar }}
          ></DataGrid>
        </Box>
      </Box>
    </Box>
  );
};

export default ManageWorkgroup;
