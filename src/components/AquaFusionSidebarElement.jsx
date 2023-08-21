import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

const AquaFusionSideBarElement = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      display="flex"
      backgroundColor={colors.primary[400]}
      borderRadius="5px"
      padding="5px"
    >
      <img
        alt="logo"
        width="20px"
        height="25px"
        src={`../../assets/logo_image.png`}
      />
      <Typography variant="h3" color={colors.grey[100]} sx={{ paddingLeft: 1 }}>
        AquaFusion
      </Typography>
    </Box>
  );
};

export default AquaFusionSideBarElement;
