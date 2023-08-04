import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarExport,
} from "@mui/x-data-grid";

const NotificationTable = ({ notificationDataToday }) => {
  const columns = [
    { field: "id", headerName: "Notification ID", fontWeight: "bold" },
    { field: "time", headerName: "Time", fontWeight: "bold" },
    { field: "name", headerName: "Notification", flex: 1, fontWeight: "bold" },
    {
      field: "type",
      headerName: "Notification Type",
      flex: 1,
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
        rows={notificationDataToday}
        columns={columns}
        components={{ Toolbar: customToolBar }}
      ></DataGrid>
    </>
  );
};

export default NotificationTable;
