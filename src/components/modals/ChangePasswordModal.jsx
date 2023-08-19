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

const ChangePasswordModal = ({ isOpen, onRequestClose, onChangePassword }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // useStates for the textfields
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPasswordField] = useState("");

  const handlePasswordChange = () => {
    onChangePassword(newPassword);
    setNewPassword("");
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
          //bgcolor: "background.paper",
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
          Change Your Password
        </Typography>
        <TextField
          type="password"
          label="New Password"
          variant="outlined"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          type="password"
          label="Confirm New Password"
          variant="outlined"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPasswordField(e.target.value)}
          fullWidth
          sx={{ mb: 4 }}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={handlePasswordChange}
          sx={{ mr: 2 }}
        >
          Change Password
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            setConfirmNewPasswordField("");
            setNewPassword("");
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

export default ChangePasswordModal;
