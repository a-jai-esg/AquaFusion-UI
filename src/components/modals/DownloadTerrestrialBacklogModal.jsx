import React, { useState } from "react";
import {
  useTheme,
  Modal,
  Box,
  Button,
  Typography,
  TextField,
  CircularProgress,
} from "@mui/material";
import { tokens } from "../../theme";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import axios from "axios";
import { saveAs } from "file-saver";
import Papa from "papaparse";

const DownloadTerrestrialBacklogModal = ({
  isOpen,
  onRequestClose,
  onDownloadBacklog,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("userData"));
  const workgroupId = user.workgroupId;

  const formatDate = (date) => {
    return date ? dayjs(date).format("MM/DD/YYYY") : "";
  };

  const handleSetStartDate = (date) => {
    setStartDate(date);
  };

  const handleSetEndDate = (date) => {
    setEndDate(date);
  };

  const handleDownloadBacklog = async () => {
    // Validate start date and end date
    if (startDate && endDate && startDate > endDate) {
      toast.error("Start date cannot be greater than end date.", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    setLoading(true);

    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    try {
      const downloadBacklogURL =
        "https://us-central1-aquafusion-b8744.cloudfunctions.net/api/system/administrative/get_system_terrestrial_values";

      const result = await axios.post(downloadBacklogURL, {
        emailAddress: localStorage.getItem("emailAddress"),
        password: localStorage.getItem("password"),
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      });

      let i = 0;

      const descriptors = [
        "DHT22_Humidity_values",
        "DHT22_Temperature_values",
        "plant_growth_values",
      ];

      result.data.forEach((resultant) => {
        // Convert JSON to CSV using PapaParse
        const csv = Papa.unparse(resultant);
        // Create Blob with CSV data
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });

        let filename;

        formattedStartDate === formattedEndDate
          ? (filename = `${workgroupId}-${formattedStartDate}-terrestrial-${descriptors[i]}-backlog_data.csv`)
          : (filename = `${workgroupId}-${formattedStartDate} to ${formattedEndDate}-terrestrial-${descriptors[i]}-backlog_data.csv`);

        // Download the CSV file
        saveAs(blob, filename);
        i++;
      });

      toast.success("Backlog downloaded successfully", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      toast.error("Backlog not found.", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      setLoading(false);
      onRequestClose();
    }
  };

  return (
    <>
      <ToastContainer />
      <Modal open={isOpen} onClose={onRequestClose}>
        <Box
          sx={{
            position: "absolute",
            padding: "25px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: colors.primary[400],
            boxShadow: 24,
            p: 4,
            minWidth: 300,
            outline: "none",
          }}
        >
          <Typography
            variant="h4"
            component="h5"
            gutterBottom
            sx={{ paddingBottom: "5px" }}
          >
            Download Terrestrial Data Backlog
          </Typography>
          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={handleSetStartDate}
                renderInput={(params) => (
                  <TextField {...params} value={formatDate(startDate)} />
                )}
                sx={{ mr: 2 }}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={handleSetEndDate}
                renderInput={(params) => (
                  <TextField {...params} value={formatDate(endDate)} />
                )}
                sx={{ mr: 2 }}
              />
            </LocalizationProvider>
          </div>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleDownloadBacklog}
            sx={{ mt: 2, mr: 2 }}
          >
            {loading ? (
              <CircularProgress size={20} sx={{ color: colors.primary[300] }} />
            ) : (
              "Download Backlog"
            )}
          </Button>
          <Button
            variant="outlined"
            onClick={onRequestClose}
            sx={{ mt: 2, mr: 2 }}
            color="secondary"
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default DownloadTerrestrialBacklogModal;
