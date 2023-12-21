import { useState, useEffect } from "react";
import { Box, useTheme, Typography, Button } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";

// modals
import ChangePasswordModal from "../../components/modals/ChangePasswordModal";
import EditProfileModal from "../../components/modals/EditProfileModal";

const Profile = ({ userName, accountID, emailAddress, workgroupName }) => {
  useEffect(() => {
    document.title = "My Profile";
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData"));

  // for password modals
  const handleOpenPasswordModal = () => {
    setIsPasswordModalOpen(true);
  };

  const handleClosePasswordModal = () => {
    setIsPasswordModalOpen(false);
  };

  // for edit profile modals
  const handleOpenEditModal = () => {
    setIsEditProfileModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditProfileModalOpen(false);
  };

  return (
    <Box m="20px">
      <Box display="flex" justifycontent="space-between" alignItems="center">
        <Header title="Profile" subtitle="View and Edit Profile Information" />
      </Box>
      <Box
        mt="5px"
        ml="350px"
        mr="350px"
        p="50px"
        h="50vh"
        borderRadius="15px"
        backgroundColor={colors.primary[400]}
      >
        <Box>
          <Box
            mt="15px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <img
              alt="profile-user"
              width="100px"
              height="100px"
              src={userData.profilePicture}
              style={{ cursor: "pointer", borderRadius: "50%" }}
            />
          </Box>

          {/* profile details */}
          <Box textAlign="center">
            <Typography
              variant="h2"
              color={colors.grey[100]}
              fontWeight="bold"
              sx={{ m: "10px 0 0 0" }}
            >
              {userData.fullName}
            </Typography>
            <Typography variant="h5" color={colors.greenAccent[500]}>
              Registered Administrator
            </Typography>
          </Box>

          {/* workgroup */}
          <Box mt="50px" textAlign="center">
            <Typography
              variant="h4"
              color={colors.grey[100]}
              fontWeight="600"
              sx={{ m: "15px 0 0 0" }}
            >
              WORKGROUP ID
            </Typography>
            <Typography variant="h5" fontWeight="300" color={colors.grey[100]}>
              {userData.workgroupId}
            </Typography>
          </Box>

          {/* account ID */}
          <Box mt="30px" textAlign="center">
            <Typography
              variant="h4"
              color={colors.grey[100]}
              fontWeight="600"
              sx={{ m: "15px 0 0 0" }}
            >
              ACCOUNT ID
            </Typography>
            <Typography variant="h5" fontWeight="300" color={colors.grey[100]}>
              {userData.accountId}
            </Typography>
          </Box>

          {/* Email Address */}
          <Box mt="30px" textAlign="center">
            <Typography
              variant="h4"
              color={colors.grey[100]}
              fontWeight="600"
              sx={{ m: "15px 0 0 0" }}
            >
              EMAIL ADDRESS
            </Typography>
            <Typography variant="h5" fontWeight="300" color={colors.grey[100]}>
              {userData.emailAddress}
            </Typography>
          </Box>
          <Box mt="50px" textAlign="center">
            <Button
              variant="outlined"
              onClick={handleOpenEditModal}
              sx={{
                borderColor: "#ffffff",
                color: "inherit",
              }}
            >
              Edit Profile
            </Button>
            <EditProfileModal
              isOpen={isEditProfileModalOpen}
              onRequestClose={handleCloseEditModal}
            />
          </Box>
          <Box mt="5px" textAlign="center">
            <Button
              variant="filled"
              color="secondary"
              onClick={handleOpenPasswordModal}
              sx={{
                borderColor: "inherit",
                color: "#ffffff",
              }}
            >
              Change Password
            </Button>
            <ChangePasswordModal
              isOpen={isPasswordModalOpen}
              onRequestClose={handleClosePasswordModal}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
