import { useState } from "react";

import * as Yup from "yup";
import axios from "axios";
import { Formik, Form } from "formik";
import {
  TextField,
  Button,
  FormControl,
  Box,
  Typography,
  Paper,
  FormLabel,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const formLabelStyles = {
  fontSize: "16px",
  fontWeight: 700,
  lineHeight: "24px",
  color: "#333333",
  marginBottom: "10px",
};

const formControlStyles = {
  marginBottom: "16px",
  "& .MuiOutlinedInput-root": {
    // maxHeight: "50px",
    "& fieldset": {
      borderColor: "#A5B6CD",
    },
  },
};

const formInputStyles = {
  style: {
    color: "#2C3642",
    fontSize: "18px",
  },
};

const formInputLabelStyles = {
  style: { color: "#4D5C6F", fontSize: "18px" },
};

const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const years = Array.from({ length: 2024 - 1900 + 1 }, (_, i) => 2024 - i);

const initialValues = {
  full_name: "",
  contact_number: "",
  day: "",
  month: "",
  year: "",
  email: "",
  password: "",
  confirm_password: "",
};

const isValidCanadianPhoneNumber = (value) => {
  const re = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  return re.test(value) || (value.length === 10 && /^\d{10}$/.test(value));
};

const validationSchema = Yup.object({
  full_name: Yup.string()
    .matches(
      /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
      "No symbols and no spaces around"
    )
    .trim("No spaces around")
    .required("Full name is required"),
  contact_number: Yup.string()
    .required("Contact number is required")
    .test(
      "is-valid-phone",
      "Invalid Canadian phone number format",
      isValidCanadianPhoneNumber
    ),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  day: Yup.number()
    .integer("Invalid day format")
    .min(1, "Day must be between 1 and 31")
    .max(31, "Day must be between 1 and 31")
    .required("Day is required"),
  month: Yup.string()
    .matches(
      /^(January|February|March|April|May|June|July|August|September|October|November|December)$/,
      "Invalid month format"
    )
    .required("Month is required"),
  year: Yup.number()
    .integer("Year must be an integer.")
    .max(new Date().getFullYear(), "Year must be a past date.")
    .required("Year is required."),
  password: Yup.string()
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const RegisterForm = () => {
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccess(false);
  };

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenError(false);
  };

  const submitForm = async (formData) => {
    try {
      const response = await axios.post(
        "https://fullstack-test-navy.vercel.app/api/users/create",
        formData
      );
      response.data.title === "Success"
        ? setOpenSuccess(true)
        : console.log(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleSubmit = (errors) => {
    console.log(errors);
    if (Object.keys(errors).length > 0) {
      console.log("errors");
      setOpenError(true);
    }
  };

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={(values) => {
        values.date_of_birth = `${values.day}, ${values.month}, ${values.year}`;
        submitForm(values);
      }}
    >
      {(form, errors) => (
        <Form noValidate>
          <Box sx={{ marginTop: 4, maxWidth: "502px", margin: "auto" }}>
            <Snackbar
              open={openSuccess}
              autoHideDuration={6000}
              onClose={handleCloseSuccess}
              sx={{ backgroundColor: "CDFADC" }}
              anchorOrigin={{
                vertical: isMobile ? "bottom" : "top",
                horizontal: "right",
              }}
            >
              <Alert
                onClose={handleCloseSuccess}
                variant="filled"
                sx={{ width: "100%" }}
                style={{
                  backgroundColor: "#CDFADC",
                  color: "#333333",
                  fontSize: "16px",
                }}
              >
                User account successfully created
              </Alert>
            </Snackbar>

            <Snackbar
              open={openError}
              autoHideDuration={6000}
              onClose={handleCloseError}
              sx={{ backgroundColor: "CDFADC" }}
              anchorOrigin={{
                vertical: isMobile ? "bottom" : "top",
                horizontal: "right",
              }}
            >
              <Alert
                severity="error"
                onClose={handleCloseError}
                variant="filled"
                sx={{ width: "100%" }}
                style={{
                  backgroundColor: "#FFC0C0",
                  color: "#333333",
                  fontSize: "16px",
                }}
              >
                There was an error creating the account.
              </Alert>
            </Snackbar>
            <Typography
              component="h1"
              sx={(theme) => ({
                fontSize: "20px",
                fontWeight: 700,
                marginBottom: "15px",
                [theme.breakpoints.down("sm")]: {
                  marginBottom: "22px",
                  marginLeft: "26px",
                },
              })}
            >
              Create User Account
            </Typography>
            <Paper
              sx={(theme) => ({
                padding: "40px",
                boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.05)",
                [theme.breakpoints.down("sm")]: {
                  padding: "24px",
                  borderTop: "1px solid #D8E0E9",
                },
              })}
            >
              <FormControl fullWidth>
                <FormLabel sx={formLabelStyles}>Full Name</FormLabel>
                <TextField
                  name="full_name"
                  type="text"
                  placeholder="Full Name *"
                  label="Full Name *"
                  variant="outlined"
                  fullWidth
                  sx={formControlStyles}
                  InputLabelProps={formInputLabelStyles}
                  InputProps={formInputStyles}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.full_name}
                  error={
                    form.touched.full_name && Boolean(form.errors.full_name)
                  }
                  helperText={form.touched.full_name && form.errors.full_name}
                />
              </FormControl>

              <FormControl fullWidth>
                <FormLabel sx={formLabelStyles}>Contact Number</FormLabel>
                <TextField
                  name="contact_number"
                  type="text"
                  placeholder="Contact Number *"
                  label="Contact Number *"
                  variant="outlined"
                  fullWidth
                  sx={formControlStyles}
                  InputLabelProps={formInputLabelStyles}
                  InputProps={formInputStyles}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.contact_number}
                  error={
                    form.touched.contact_number &&
                    Boolean(form.errors.contact_number)
                  }
                  helperText={
                    form.touched.contact_number && form.errors.contact_number
                  }
                />
              </FormControl>

              <FormLabel sx={formLabelStyles}>Birthdate</FormLabel>
              <Box
                sx={(theme) => ({
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px",
                  [theme.breakpoints.down("sm")]: {
                    gap: "6px",
                  },
                })}
              >
                <TextField
                  name="day"
                  type="text"
                  select
                  label="Day *"
                  sx={{ ...formControlStyles, width: "124px" }}
                  InputLabelProps={formInputLabelStyles}
                  InputProps={formInputStyles}
                  SelectProps={{
                    MenuProps: {
                      style: {
                        maxHeight: 300,
                      },
                    },
                  }}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.day}
                  error={form.touched.day && Boolean(form.errors.day)}
                  helperText={form.touched.day && form.errors.day}
                >
                  {days.map((day) => (
                    <MenuItem key={day} value={day}>
                      {day}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  name="month"
                  type="text"
                  select
                  label="Month *"
                  sx={{ ...formControlStyles, width: "124px" }}
                  InputLabelProps={formInputLabelStyles}
                  InputProps={formInputStyles}
                  SelectProps={{
                    MenuProps: {
                      style: {
                        maxHeight: 300,
                      },
                    },
                  }}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.month}
                  error={form.touched.month && Boolean(form.errors.month)}
                  helperText={form.touched.month && form.errors.month}
                >
                  {months.map((month) => (
                    <MenuItem key={month} value={month}>
                      {month}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  name="year"
                  type="text"
                  select
                  label="Year *"
                  sx={{ ...formControlStyles, width: "124px" }}
                  InputLabelProps={formInputLabelStyles}
                  InputProps={formInputStyles}
                  SelectProps={{
                    MenuProps: {
                      style: {
                        maxHeight: 300,
                      },
                    },
                  }}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.year}
                  error={form.touched.year && Boolean(form.errors.year)}
                  helperText={form.touched.year && form.errors.year}
                >
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>

              <FormControl fullWidth>
                <FormLabel sx={formLabelStyles}>Email Address</FormLabel>
                <TextField
                  name="email"
                  type="email"
                  label="Email Address *"
                  variant="outlined"
                  fullWidth
                  error={form.touched.email && Boolean(form.errors.email)}
                  helperText={form.touched.email && form.errors.email}
                  sx={formControlStyles}
                  InputLabelProps={formInputLabelStyles}
                  InputProps={formInputStyles}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.email}
                />
              </FormControl>

              <FormControl fullWidth>
                <FormLabel sx={formLabelStyles}>Password</FormLabel>
                <TextField
                  name="password"
                  label="Create Password *"
                  variant="outlined"
                  fullWidth
                  error={form.touched.password && Boolean(form.errors.password)}
                  helperText={form.touched.password && form.errors.password}
                  type="password"
                  sx={formControlStyles}
                  InputLabelProps={formInputLabelStyles}
                  InputProps={formInputStyles}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.password}
                />
              </FormControl>

              <FormControl fullWidth>
                <FormLabel sx={formLabelStyles}>Confirm Password</FormLabel>
                <TextField
                  name="confirm_password"
                  label="Confirm Password *"
                  variant="outlined"
                  fullWidth
                  error={
                    form.touched.confirm_password &&
                    Boolean(form.errors.confirm_password)
                  }
                  helperText={
                    form.touched.confirm_password &&
                    form.errors.confirm_password
                  }
                  type="password"
                  sx={(theme) => ({
                    ...formControlStyles,
                    [theme.breakpoints.down("sm")]: {
                      marginBottom: "78px",
                    },
                  })}
                  InputLabelProps={formInputLabelStyles}
                  InputProps={formInputStyles}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.confirm_password}
                />
              </FormControl>
            </Paper>

            <Box
              sx={(theme) => ({
                display: "flex",
                justifyContent: "center",
                gap: "15px",
                paddingTop: "45px",

                [theme.breakpoints.down("sm")]: {
                  boxShadow: "0px 4px 20px 4px #00000026",
                  flexDirection: "column",
                  alignItems: "center",
                  paddingTop: "20px",
                  gap: "12px",
                },
              })}
            >
              <Button
                variant="outlined"
                sx={(theme) => ({
                  fontWeight: 700,
                  lineHeight: "20px",
                  color: "#4790A1",
                  borderColor: "#4790A1",
                  fontSize: "16px",
                  textTransform: "none",
                  padding: "13px 48px",

                  [theme.breakpoints.down("sm")]: {
                    width: "90%",
                    marginLeft: "25px",
                    marginRight: "25px",
                  },
                })}
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleSubmit(form.errors)}
                type="submit"
                variant="contained"
                color="primary"
                sx={(theme) => ({
                  fontWeight: 700,
                  lineHeight: "20px",
                  color: "#FFFFFF",
                  backgroundColor: "#127C95",
                  fontSize: "16px",
                  textTransform: "none",
                  padding: "13px 48px",

                  [theme.breakpoints.down("sm")]: {
                    width: "90%",
                    marginLeft: "25px",
                    marginRight: "25px",
                    marginBottom: "20px",
                  },
                })}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
