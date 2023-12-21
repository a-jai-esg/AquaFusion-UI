import React, { useState, useEffect } from "react";
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
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const SetHarvestCalendarModal = ({
  isOpen,
  onRequestClose,
  selectedEvent,
  onSave,
  onReloadCalendar,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const convertToDayjs = (date) => (date ? dayjs(date) : null);

  const [plantedDate, setPlantedDate] = useState(
    convertToDayjs(selectedEvent?.start)
  );
  const [harvestDescription, setHarvestDescription] = useState(
    selectedEvent?.extendedProps?.description || ""
  );
  const [harvestName, setHarvestName] = useState(selectedEvent?.title || "");
  const [harvestDate, setHarvestDate] = useState(
    convertToDayjs(selectedEvent?.end)
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPlantedDate(convertToDayjs(selectedEvent?.start));
    setHarvestDescription(selectedEvent?.extendedProps?.description || "");
    setHarvestName(selectedEvent?.title || "");
    setHarvestDate(convertToDayjs(selectedEvent?.end));
  }, [selectedEvent]);

  const handleSetPlantedDate = (date) => {
    setPlantedDate(date);
  };

  const handleSetHarvestDate = (date) => {
    setHarvestDate(date);
  };

  const handleHarvestDetails = async () => {
    setLoading(true);

    const formattedPlantedDate = plantedDate
      ? plantedDate.format("YYYY-MM-DD")
      : "";
    const formattedHarvestDate = harvestDate
      ? harvestDate.format("YYYY-MM-DD")
      : "";

    const updatedEvent = {
      title: harvestName,
      start: formattedPlantedDate,
      end: formattedHarvestDate,
      extendedProps: {
        description: harvestDescription,
      },
    };

    const setHarvestCalendarScheduleURL =
      "https://us-central1-aquafusion-b8744.cloudfunctions.net/api/farmadmin/administrative/set_harvest_schedule";

    try {
      const response = await axios.post(setHarvestCalendarScheduleURL, {
        emailAddress: localStorage.getItem("emailAddress"),
        password: localStorage.getItem("password"),
        plantedDate: formattedPlantedDate,
        harvestDate: formattedHarvestDate,
        harvestName: harvestName,
        harvestDescription: harvestDescription,
      });

      toast.success(`${response.data.message}`, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });

      await onSave(updatedEvent);
      onReloadCalendar();
      onRequestClose();
    } catch (error) {
      console.error("Error setting harvest schedule:", error);
      toast.error(`${error.message}`, {
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
            Set Harvest Calendar Schedule
          </Typography>
          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Planted Date"
                value={plantedDate}
                onChange={handleSetPlantedDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Harvest Date"
                value={harvestDate}
                onChange={handleSetHarvestDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <TextField
            type="text"
            label="Enter Harvest Description"
            variant="outlined"
            value={harvestDescription}
            onChange={(e) => setHarvestDescription(e.target.value)}
            fullWidth
            sx={{ mt: 4, mb: 4 }}
          />
          <TextField
            type="text"
            label="Enter Harvest Name"
            variant="outlined"
            value={harvestName}
            onChange={(e) => setHarvestName(e.target.value)}
            fullWidth
            sx={{ mb: 4 }}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={handleHarvestDetails}
            sx={{ mr: 2 }}
          >
            {loading ? (
              <CircularProgress size={20} sx={{ color: colors.primary[300] }} />
            ) : (
              "Set Harvest Schedule"
            )}
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setHarvestDate(null);
              setHarvestName("");
              setHarvestDescription("");
              onRequestClose();
            }}
            color="secondary"
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default SetHarvestCalendarModal;
