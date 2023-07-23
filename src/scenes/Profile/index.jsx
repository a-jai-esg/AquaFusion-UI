import { useEffect } from "react";
import { Box } from "@mui/material";
import Header from "../../components/Header";

const Profile = () => {
  useEffect(() => {
    document.title = "My Profile";
  }, []);

  return (
    <Box m="20px">
      <Box display="flex" justifycontent="space-between" alignItems="center">
        <Header title="Profile" subtitle="View and Edit Profile Information" />
      </Box>
    </Box>
  );
};

export default Profile;
