import { useTheme, Typography } from "@mui/material";
import { tokens } from "../theme";

const LogoComponent = ({ text }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
      <img
        width="auto"
        height="50%"
        src={`../../assets/logo_image.png`}
        style={{ cursor: "pointer" }}
      />
      <img
        width="50%"
        height="auto"
        src={`../../assets/logo_title.png`}
        style={{ cursor: "pointer" }}
      />
      <Typography
        component="h1"
        variant="h2"
        fontWeight={600}
        padding="25px"
        margin="5px"
        color={colors.greenAccent[500]}
      >
        {text}
      </Typography>
    </>
  );
};

export default LogoComponent;
