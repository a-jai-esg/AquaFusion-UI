import React, { useState } from "react";
import {
  useTheme,
  Modal,
  Box,
  Button,
  Typography,
  TextField,
  Input,
} from "@mui/material";
import { tokens } from "../../theme";

const EditProfileModal = ({ isOpen, onRequestClose, onEditProfile }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // useStates for the textfield and input
  const [newProfileName, setNewProfileName] = useState("");
  const [newProfilePicture, setNewProfilePicture] = useState("");

  const handleEditProfile = () => {
    onEditProfile(newProfileName, newProfilePicture);
    setNewProfileName("");
    setNewProfilePicture("");
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
          Edit Profile
        </Typography>
        <Input
          type="file"
          label="Choose a new picture for your profile"
          onChange={(e) => setNewProfilePicture(e.target.files[0])}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          type="name"
          label="Enter your new name"
          variant="outlined"
          value={newProfileName}
          onChange={(e) => setNewProfileName(e.target.value)}
          fullWidth
          sx={{ mb: 4 }}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={handleEditProfile}
          sx={{ mr: 2 }}
        >
          Edit Profile
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            setNewProfilePicture("");
            setNewProfileName("");
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

export default EditProfileModal;
