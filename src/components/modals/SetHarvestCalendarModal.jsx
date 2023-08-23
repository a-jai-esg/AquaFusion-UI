import React, { useState } from "react";
import {
  useTheme,
  Modal,
  Box,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import { tokens } from "../../theme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";

const SetHarvestCalendarModal = ({ isOpen, onRequestClose, selectedDate }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // useStates for the textfield and input
  const [sowingDate, setSowingDate] = useState(selectedDate);
  const [cropDescription, setCropDescription] = useState("");
  const [cropName, setCropName] = useState("");
  const [cropHarvestInterval, setCropHarvestInterval] = useState(0);

  const handleSetDate = (date) => {
    setSowingDate(date);
  };

  const handleHarvestDetails = () => {
    setCropDescription(cropDescription);
    setCropName(cropName);
    confirm(
      `Set Harvest Calendar?\n\nSowing date: ${sowingDate}\nCrop name: ${cropName}\nHarvest Interval (in days?): ${cropHarvestInterval}\n\nAdditional Details:\n${cropDescription}`
    );
    onRequestClose();
  };

  const handleCloseSetHarvestCalendarModal = () => {
    setHarvestDate(null);
    onRequestClose();
  };

  return (
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
          Set Planting and Harvest Schedule
        </Typography>
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date"
              value={sowingDate}
              onChange={handleSetDate}
              renderInput={(params) => <input {...params} />}
            />
          </LocalizationProvider>
          <TextField
            type="number"
            label="Enter Crop Harvest Interval (in Days)"
            variant="outlined"
            value={cropHarvestInterval}
            onChange={(e) => setCropHarvestInterval(e.target.value)}
            sx={{ width: "35vh", ml: 4, mb: 4 }}
          />
        </div>
        <TextField
          type="text"
          label="Enter Harvest Description"
          variant="outlined"
          value={cropDescription}
          onChange={(e) => setCropDescription(e.target.value)}
          fullWidth
          sx={{ mb: 4 }}
        />
        <TextField
          type="text"
          label="Enter Crop Name"
          variant="outlined"
          value={cropName}
          onChange={(e) => setCropName(e.target.value)}
          fullWidth
          sx={{ mb: 4 }}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={handleHarvestDetails}
          sx={{ mr: 2 }}
        >
          Set Harvest Schedule
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            setSowingDate(null);
            setCropName("");
            setHarvestDescription("");
            onRequestClose();
          }}
          color="secondary"
        >
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default SetHarvestCalendarModal;
