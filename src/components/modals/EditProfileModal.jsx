import React, { useState, useRef, useCallback } from "react";
import {
  useTheme,
  Modal,
  Box,
  Button,
  Typography,
  Input,
  TextField,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { tokens } from "../../theme";

const EditProfileModal = ({ isOpen, onRequestClose }) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [newFullName, setNewFullName] = useState(userData.fullName);
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [fileInputValue, setFileInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef();
  const storage = getStorage();

  const showToast = useCallback((message, isError = false) => {
    const options = {
      position: "top-center",
      autoClose: 2000,
      draggable: false,
      pauseOnHover: false,
      theme: "colored",
    };
    isError ? toast.error(message, options) : toast.success(message, options);
  }, []);

  const uploadProfilePicture = async () => {
    if (!newProfilePicture) {
      // If no new profile picture is set, simply return
      return null;
    }

    const storageRef = ref(
      storage,
      `farm_admin/${userData.emailAddress}/profile_picture`
    );

    try {
      const snapshot = await uploadBytes(storageRef, newProfilePicture);
      return await getDownloadURL(snapshot.ref);
    } catch (error) {
      showToast(`Error uploading file: ${error.message}`, true);
      throw error;
    }
  };

  const updateProfile = async (fullName) => {
    setIsLoading(true);
    const password = localStorage.getItem("password");
    const updateNameURL =
      "https://us-central1-aquafusion-b8744.cloudfunctions.net/api/farmadmin/account/update_name";
    const updateProfilePictureURL =
      "https://us-central1-aquafusion-b8744.cloudfunctions.net/api/farmadmin/account/update_profile_picture";

    try {
      let profilePictureURL = "";
      if (newProfilePicture) {
        profilePictureURL = await uploadProfilePicture();
      }

      await axios.post(updateNameURL, {
        emailAddress: userData.emailAddress,
        password,
        fullName,
      });

      if (profilePictureURL) {
        await axios.post(updateProfilePictureURL, {
          emailAddress: userData.emailAddress,
          password,
          profilePictureURL,
        });
      }

      showToast("Profile updated successfully. Please logout to see changes.");
    } catch (error) {
      showToast(`An error occurred: ${error}`, true);
    } finally {
      setIsLoading(false);
      onRequestClose();
    }
  };

  const handleEditProfile = async () => {
    try {
      if (newFullName === "") {
        await updateProfile(userData.fullName);
      } else {
        await updateProfile(newFullName, "");
      }
    } catch (error) {
      showToast(`An error has occurred: ${error}`, true);
    } finally {
      setNewFullName("");
      setNewProfilePicture(null);
      setFileInputValue("");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setNewProfilePicture(file);
      setFileInputValue(e.target.value);
    } else {
      showToast("Only JPG and PNG files are allowed.", true);
      setFileInputValue("");
      setNewProfilePicture(null);
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
            {isLoading ? "Editing Profile... Please wait." : "Edit Profile"}
          </Typography>
          {isLoading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <CircularProgress
                sx={{ padding: "5px", color: colors.grey[200] }}
              />
            </Box>
          ) : (
            <>
              <Input
                type="file"
                value={fileInputValue}
                onChange={handleFileChange}
                fullWidth
                sx={{ mb: 2 }}
                ref={fileInputRef}
              />
              <TextField
                type="name"
                label="Enter your new name"
                variant="outlined"
                value={newFullName}
                onChange={(e) => setNewFullName(e.target.value)}
                fullWidth
                sx={{ mb: 4 }}
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={handleEditProfile}
                sx={{ mr: 2 }}
              >
                Save Changes
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  setNewProfilePicture(null);
                  setNewFullName("");
                  setFileInputValue("");
                  onRequestClose();
                }}
                color="secondary"
              >
                Cancel
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default EditProfileModal;
