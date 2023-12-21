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
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { tokens } from "../../theme";

const ChangePasswordModal = ({ isOpen, onRequestClose }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPasswordField] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add a loading state

  const handlePasswordChange = () => {
    if (newPassword !== confirmNewPassword) {
      toast.error("Fields don't match. Please try again.", {
        position: "top-center",
        autoClose: 2000,
        draggable: false,
        pauseOnHover: false,
        theme: "colored",
      });
      return;
    }

    setIsLoading(true); // Start loading before API call

    const farmAdminChangePasswordURL =
      "https://us-central1-aquafusion-b8744.cloudfunctions.net/api/farmadmin/account/change_password";

    axios
      .post(farmAdminChangePasswordURL, {
        emailAddress: localStorage.getItem("emailAddress"),
        password: localStorage.getItem("password"),
        newPassword: newPassword,
      })
      .then((response) => {
        toast.success(`${response.data.message}`, {
          position: "top-center",
          autoClose: 2000,
          draggable: false,
          pauseOnHover: false,
          theme: "colored",
        });

        localStorage.setItem("password", newPassword);
      })
      .catch((error) => {
        toast.error(`An error has occurred: ${error}`, {
          position: "top-center",
          autoClose: 2000,
          draggable: false,
          pauseOnHover: false,
          theme: "colored",
        });
      })
      .finally(() => {
        setIsLoading(false); // Stop loading after API call
        onRequestClose();
      });
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
            Change Password
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
            disabled={isLoading} // Disable the button when loading
            sx={{ mr: 2 }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Change Password"
            )}
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
    </>
  );
};

export default ChangePasswordModal;
