import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarExport,
} from "@mui/x-data-grid";

const NotificationTable = ({ notificationData, isDefault }) => {
  var maxWidth = 0;
  isDefault ? (maxWidth = 400) : (maxWidth = 200);

  const columns = [
    { field: "id", headerName: "Notification ID", fontWeight: "bold" },
    { field: "time", headerName: "Time", fontWeight: "bold" },
    {
      field: "name",
      headerName: "Notification",
      flex: 2,
      maxWidth: maxWidth,
      fontWeight: "bold",
    },
    {
      field: "type",
      headerName: "Notification Type",
      flex: 2,
      maxWidth: maxWidth,
      fontWeight: "bold",
    },
    {
      field: "criticality",
      headerName: "Criticality",
      flex: 2,
      maxWidth: maxWidth,
      fontWeight: "bold",
    },
  ];

  const customToolBar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  };

  return (
    <>
      <DataGrid
        rows={notificationData}
        columns={columns}
        autoHeight
        components={{ Toolbar: customToolBar }}
      ></DataGrid>
    </>
  );
};

export default NotificationTable;
