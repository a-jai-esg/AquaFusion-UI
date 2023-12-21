import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { tokens } from "../../theme";
import axios from "axios";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialValues = {
  fullName: "",
  emailAddress: "",
  password: "",
  confirmPassword: "",
};

const userSchema = yup.object().shape({
  fullName: yup.string().required("Required."),
  emailAddress: yup.string().email("Invalid Email.").required("Required."),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null]),
});

const Registration = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  let navigate = useNavigate();

  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState(initialValues);

  const userData = JSON.parse(localStorage.getItem("userData"));

  const routeChange = () => {
    let path = "/register-farmer/requests";
    navigate(path);
  };

  const handleFormSubmit = (values, { resetForm }) => {
    setLoading(true);
    const farmerRegistrationURL =
      "https://us-central1-aquafusion-b8744.cloudfunctions.net/api/farmer/account/register";

    if (values.password !== values.confirmPassword) {
      setLoading(false);
      toast.error("Passwords do not match. Please try again.", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
    } else {
      console.log(values);
      axios
        .post(farmerRegistrationURL, {
          fullName: values.fullName,
          emailAddress: values.emailAddress,
          password: values.password,
          workgroupId: userData.workgroupId,
          verified: true,
        })
        .then((response) => {
          setLoading(false);
          toast.success(`${response.data.message}`, {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "colored",
          });
          resetForm();
        })
        .catch((error) => {
          setLoading(false);
          toast.error(`${error.response.data.message}`, {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "colored",
          });
        });
    }
  };

  useEffect(() => {
    document.title = "Register Farmer";
  }, []);

  return (
    <Box m="20px">
      <ToastContainer />
      <Header
        title="Register Farmer"
        subtitle="Register a Farmer to your managed workgroup."
      />
      <label htmlFor="registration-requests">
        <Button
          component="span"
          variant="contained"
          color="secondary"
          onClick={routeChange}
          sx={{
            gridColumn: "span 5",
            height: 50,
            width: 300,
          }}
        >
          Approve Farmer Registration Requests
        </Button>
      </label>
      <Box marginTop="75px" p="30px" backgroundColor={colors.primary[400]}>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={formValues}
          validationSchema={userSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1f))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Complete Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.fullName}
                  name="fullName"
                  error={!!touched.fullName && !!errors.fullName}
                  helperText={touched.fullName && errors.fullName}
                  sx={{
                    gridColumn: "span 4",
                  }}
                ></TextField>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Email Address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.emailAddress}
                  name="emailAddress"
                  error={!!touched.emailAddress && !!errors.emailAddress}
                  helperText={touched.emailAddress && errors.emailAddress}
                  sx={{
                    gridColumn: "span 4",
                  }}
                ></TextField>
                <TextField
                  fullWidth
                  variant="filled"
                  type="password"
                  label="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  sx={{
                    gridColumn: "span 4",
                  }}
                ></TextField>
                <TextField
                  fullWidth
                  variant="filled"
                  type="password"
                  label="Confirm Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                  name="confirmPassword"
                  error={!!touched.confirmPassword && !!errors.confirmPassword}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  sx={{
                    gridColumn: "span 4",
                  }}
                ></TextField>
                <input
                  id="profilePicture"
                  name="profilePicture"
                  type="file"
                  onChange={(event) => {
                    setFormValues({
                      ...formValues,
                      profilePicture: event.currentTarget.files[0],
                    });
                  }}
                  style={{ display: "none" }}
                />
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                marginTop="30px"
                sx={{
                  "& .MuiButton-contained": {
                    fontSize: 18,
                    fontWeight: 400,
                    gridColumn: "span 4",
                  },
                }}
              >
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  disabled={loading}
                  sx={{
                    gridColumn: "span 4",
                    height: 75,
                    width: 512,
                  }}
                >
                  {loading ? (
                    <CircularProgress
                      size={24}
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        mt: "-12px",
                        ml: "-12px",
                      }}
                    />
                  ) : (
                    "Register!"
                  )}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Registration;
