import { useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  useTheme,
  autocompleteClasses,
} from "@mui/material";
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

const AdminApprovedRegistration = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const handleFormSubmit = (values) => {
    console.log(values);
  };

  useEffect(() => {
    document.title = "Register";
  }, []);

  return (
    <Box m="20px">
      <Header
        title="Register a User"
        subtitle="Register a readily admin-approved user."
      />
      <Box marginTop="75px" p="55px">
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
                  justifyContent="right"
                  type="submit"
                  color="secondary"
                  variant="contained"
                  sx={{
                    gridColumn: "span 2",
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
    </Box>
  );
};

export default AdminApprovedRegistration;
