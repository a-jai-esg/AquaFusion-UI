import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTheme, CircularProgress } from "@mui/material";
import { tokens } from "../../theme";

const Logout = ({ setSessionIsActive }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [showAnimation, setShowAnimation] = useState(true);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const signOut = async () => {
      try {
        await axios.post(
          "https://us-central1-aquafusion-b8744.cloudfunctions.net/api/farmadmin/account/sign_out",
          {
            emailAddress: localStorage.getItem("emailAddress"),
            password: localStorage.getItem("password"),
          }
        );

        let fadeOutInterval = setInterval(() => {
          setOpacity((prevOpacity) => {
            if (prevOpacity <= 0) {
              clearInterval(fadeOutInterval);
              return 0;
            }
            return prevOpacity - 0.05;
          });
        }, 100);

        setTimeout(() => {
          localStorage.clear();
          setSessionIsActive(false);
          navigate("/");
        }, 2000); // Duration of the animation
      } catch (error) {
        console.error("Logout failed:", error);
        setShowAnimation(false);
      }
    };

    signOut();
  }, [navigate, setSessionIsActive]);

  if (!showAnimation) return null;

  const animationStyle = {
    opacity: opacity,
    transition: "opacity 2s",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "24px",
    color: colors.primary[200],
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  return (
    <div style={animationStyle}>
      <CircularProgress sx={{ color: colors.primary[200] }} />
      <div style={{ marginTop: "20px" }}>Logging out...</div>
    </div>
  );
};

export default Logout;
