import { useEffect } from "react";
import { Box } from "@mui/material";
import Header from "../../components/Header";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Dashboard" subtitle="Welcome to AquaFusion Dashboard" />
      </Box>
    </Box>
  );
};

export default Dashboard;
