import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  Box,
  InputAdornment,
  Link as MuiLink,
  useMediaQuery,
  useTheme,
  TextField,
  IconButton,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Email as EmailIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import toast from "react-hot-toast";
import { register } from "../../apis/authService";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const Register = ({ onSwitch }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await register(
          values.name,
          values.email,
          values.password
        );
        toast.success(response.data.message, { position: "top-center" });
        resetForm();
        navigate("/account"); // Navigate to login page after successful registration
      } catch (error) {
        toast.error(error.response.data.message, { position: "top-center" });
      }
    },
  });

  const fields = [
    {
      name: "name",
      label: "Name *",
      type: "text",
      endAdornment: <PersonIcon sx={{ color: "text.primary" }} />,
    },
    {
      name: "email",
      label: "Email *",
      type: "text",
      endAdornment: <EmailIcon sx={{ color: "text.primary" }} />,
    },
    {
      name: "password",
      label: "Password *",
      type: showPassword ? "text" : "password",
      endAdornment: showPassword ? (
        <VisibilityOff
          sx={{ color: "text.primary", cursor: "pointer" }}
          onClick={() => setShowPassword((prev) => !prev)}
        />
      ) : (
        <Visibility
          sx={{ color: "text.primary", cursor: "pointer" }}
          onClick={() => setShowPassword((prev) => !prev)}
        />
      ),
    },
    {
      name: "confirmPassword",
      label: "Confirm Password *",
      type: showPassword ? "text" : "password",
      endAdornment: showPassword ? (
        <VisibilityOff
          sx={{ color: "text.primary", cursor: "pointer" }}
          onClick={() => setShowPassword((prev) => !prev)}
        />
      ) : (
        <Visibility
          sx={{ color: "text.primary", cursor: "pointer" }}
          onClick={() => setShowPassword((prev) => !prev)}
        />
      ),
    },
  ];

  return (
    <Box height={"100%"} display={"flex"} flexDirection={"column"}>
      <Box>
        <Typography align="center" variant={isSmallScreen ? "h6" : "h4"}>
          Sign Up
        </Typography>
        <Typography
          align="center"
          variant={isSmallScreen ? "subtitle2" : "subtitle1"}
          color="text.secondary"
        >
          Create a Vmail account
        </Typography>
      </Box>
      <Box textAlign="center" width={"80%"} ml={"45px"}>
        <form onSubmit={formik.handleSubmit}>
          {fields.map((field) => (
            <TextField
              key={field.name}
              margin="dense"
              label={field.label}
              name={field.name}
              type={field.type}
              variant="outlined"
              fullWidth
              value={formik.values[field.name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched[field.name] && !!formik.errors[field.name]}
              helperText={
                formik.touched[field.name] && formik.errors[field.name]
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {field.endAdornment}
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiInputLabel-root": {
                  fontSize: isSmallScreen ? "0.8rem" : "0.9rem",
                },
              }}
            />
          ))}

          <Button
            type="submit"
            size="medium"
            sx={{
              // marginTop: isSmallScreen ? 1 : 2,
              margin: "15px 0 15px 11px",
              padding: ".5rem 2.5rem",
              borderRadius: "8px",
              color: "#CB3037",
              fontWeight:'bold',
              boxShadow: "0px 2px 5px -2px rgba(0, 0, 0, 0.75)"
            }}
          >
            Sign Up
          </Button>
        </form>
      </Box>
      <MuiLink
        component="span"
        onClick={onSwitch}
        underline="none"
        sx={{
          color: "text.secondary",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: "12px",
          cursor: "pointer",
        }}
      >
        Already have account?
        <IconButton
          // color="primary"
          size="small"
          sx={{ background: "transparent", border: "none", color: "#CB3037" }}
        >
          Sign in
        </IconButton>
      </MuiLink>
    </Box>
  );
};

export default Register;
