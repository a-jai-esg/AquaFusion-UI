import { useTheme, Typography } from "@mui/material";
import { tokens } from "../theme";

const LogoComponent = ({ text, component, variant, fontWeight }) => {
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
        component={component}
        variant={variant}
        fontWeight={fontWeight}
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
