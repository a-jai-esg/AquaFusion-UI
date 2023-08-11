import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, useTheme, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { tokens } from "../../theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const initialValues = {
  completeName: "",
  emailAddress: "",
  password: "",
  confirmPassword: "",
};

const userSchema = yup.object().shape({
  completeName: yup.string().required("Required."),
  emailAddress: yup.string().email("Invalid Email").required("Required."),
  password: yup.string().required("Required."),
  confirmPassword: yup.string().required("Required."),
});

const Registration = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const handleFormSubmit = (values) => {
    console.log(values);
  };

  let navigate = useNavigate();

  const routeChange = () => {
    navigate("/register-farmer/requests");
  };

  useEffect(() => {
    document.title = "Register Farmer";
  }, []);

  return (
    <Box m="20px">
      <Header
        title="Register Farmer"
        subtitle="Register a farmer to your workgroup."
      />
      <Box marginTop="75px" p="30px" backgroundColor={colors.primary[400]}>
        <Typography
          variant="h5"
          color={colors.greenAccent[500]}
          sx={{ pb: "10px", pt: "10px" }}
        >
          Register a farmer directly to the workgroup.
        </Typography>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
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
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.completeName}
                  name="completeName"
                  error={!!touched.completeName && !!errors.completeName}
                  helperText={touched.completeName && errors.completeName}
                  sx={{
                    gridColumn: "span 2",
                  }}
                ></TextField>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Email Address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.emailAddress}
                  name="emailAddress"
                  error={!!touched.emailAddress && !!errors.emailAddress}
                  helperText={touched.emailAddress && errors.emailAddress}
                  sx={{
                    gridColumn: "span 2",
                  }}
                ></TextField>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
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
                  type="text"
                  label="Confirm Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.confirmPassword}
                  name="confirmPassword"
                  error={!!touched.confirmPassword && !!errors.confirmPassword}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  sx={{
                    gridColumn: "span 4",
                  }}
                ></TextField>
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
                  sx={{
                    gridColumn: "span 4",
                    height: 75,
                    width: 512,
                  }}
                >
                  Register!
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
      <Box mt="25px" ml="25px">
        <Button
          variant="filled"
          color={colors.grey[100]}
          sx={{
            borderColor: "inherit",
            color: "#ffffff",
          }}
          onClick={routeChange}
        >
          Approve Pending Farmer Registration
        </Button>
      </Box>
    </Box>
  );
};

export default Registration;
