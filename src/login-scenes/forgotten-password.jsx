import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import LogoComponent from "../components/LogoComponent";
import {
  Button,
  TextField,
  CircularProgress,
  Container,
  Grid,
  Box,
  useTheme,
} from "@mui/material";
import { tokens } from "../theme";

const ForgottenPassword = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [emailField, setEmailField] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Forgotten Password";
  }, []);

  const navigateTo = useCallback(
    (path) => {
      navigate(path);
    },
    [navigate]
  );

  const handleFindAccount = async () => {
    setLoading(true);
    try {
      const accountFinderURL =
        "https://us-central1-aquafusion-b8744.cloudfunctions.net/api/farmadmin/administrative/reset_farmadmin_password";

      axios
        .post(accountFinderURL, {
          emailAddress: emailField,
        })
        .then((response) => {
          toast.success(`${response.data.message}.`, {
            position: "top-center",
            autoClose: 1500,
            theme: "colored",
          });
        })
        .catch((error) => {
          toast.error(`${error}`, {
            position: "top-center",
            autoClose: 1500,
            theme: "colored",
          });
        });
    } catch (error) {
      toast.error(`${error.message}`, {
        position: "top-center",
        autoClose: 1500,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <Container maxWidth="md">
        <Box
          padding="50px"
          borderRadius="15px"
          backgroundColor={colors.primary[400]}
          sx={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <LogoComponent
            text="Forgotten Password?"
            component="h1"
            variant="h2"
            fontWeight={600}
          />
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              onChange={(e) => setEmailField(e.target.value)}
              label="Email"
              type="email"
              id="email"
              autoComplete="email-address"
            />
            <Button
              fullWidth
              onClick={handleFindAccount}
              variant="contained"
              color="secondary"
              sx={{
                mt: 3,
                mb: 6,
                fontWeight: 400,
                gridColumn: "span 6",
                position: "relative",
              }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Find Account"
              )}
            </Button>
            <Grid container>
              <Grid item xs>
                <Button
                  variant="text"
                  onClick={() => navigateTo("/support")}
                  sx={{
                    textTransform: "none",
                    fontSize: "12px",
                    fontWeight: "400",
                    color: colors.grey[200],
                    letterSpacing: "normal",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  No account? Call Support to register.
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="text"
                  onClick={() => navigateTo("/")}
                  sx={{
                    textTransform: "none",
                    fontSize: "12px",
                    fontWeight: "400",
                    color: colors.grey[200],
                    letterSpacing: "normal",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  Remembered Account? Login here.
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default ForgottenPassword;
