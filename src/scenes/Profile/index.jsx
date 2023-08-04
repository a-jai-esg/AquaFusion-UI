import { useEffect } from "react";
import { Box, useTheme, Typography, Button } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const Profile = ({ userName, accountID, emailAddress, workgroupName }) => {
  useEffect(() => {
    document.title = "My Profile";
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
              src={`../../assets/user.jpg`}
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
              {userName}
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
              WORKGROUP
            </Typography>
            <Typography variant="h5" fontWeight="300" color={colors.grey[100]}>
              {workgroupName}
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
              {accountID}
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
              {emailAddress}
            </Typography>
          </Box>

          <Box mt="50px" textAlign="center">
            <Button
              variant="outlined"
              sx={{
                borderColor: "#ffffff",
                color: "inherit",
              }}
            >
              Edit Profile
            </Button>
          </Box>
          <Box mt="5px" textAlign="center">
            <Button
              variant="filled"
              color={colors.grey[100]}
              sx={{
                borderColor: "inherit",
                color: "#ffffff",
              }}
            >
              Change Password
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
