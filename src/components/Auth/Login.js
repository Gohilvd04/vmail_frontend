import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Stack,
  Typography,
  Box,
  InputAdornment,
  Link as MuiLink,
  useMediaQuery,
  useTheme,
  TextField,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";
// import { useCapsLockDetector } from '../hooks/useCapsLockDetector';
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import toast from "react-hot-toast";
import { login } from "../../apis/authService";
import { keyframes } from "@mui/system";
import { useEmailContext } from "../../context/EmailContext";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = ({ onSwitch }) => {
  const navigate = useNavigate();
  const { fetchEmails } = useEmailContext();
  //   const isCapsLockOn = useCapsLockDetector();
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await login(values.email, values.password);
        // console.log("response", response.data);
        console.log("user");
        const { token, user, message } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        // toast.success(message, { position: "top-center" });
        await fetchEmails();
        toast.promise(fetchEmails(), {
          loading: "Redirecting...",
          success: message,
          error: "Failed to fetch emails.",
        });
        navigate("/email/inbox");
      } catch (error) {
        resetForm();
        console.error(error);
        toast.error(error.response.data.message, { position: "top-center" });
      }
    },
  });

  const fields = [
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
          edge="end"
        />
      ) : (
        <Visibility
          sx={{ color: "text.primary", cursor: "pointer" }}
          onClick={() => setShowPassword((prev) => !prev)}
          edge="end"
        />
      ),
    },
  ];

  // Define keyframes for Google colors animation
  const googleColors = keyframes`
  0% { color: #4285F4; }   /* Blue */
  25% { color: #EA4335; }  /* Red */
  50% { color: #FBBC05; }  /* Yellow */
  75% { color: #34A853; }  /* Green */
  100% { color: #4285F4; } /* Blue */
`;

  return (
    <Box height={"100%"}>
      <Box width={"100%"}>
        <Typography align="center" variant={isSmallScreen ? "h6" : "h4"}>
          Sign in
        </Typography>
        <Typography
          align="center"
          variant={isSmallScreen ? "subtitle2" : "subtitle1"}
          color="text.secondary"
        >
          Sign in to stay connected
        </Typography>
      </Box>
      <Box textAlign="center" width={"80%"} ml={"45px"}>
        <form onSubmit={formik.handleSubmit}>
          {fields.map((field) => (
            <TextField
              fullWidth
              key={field.name}
              margin="dense"
              label={field.label}
              name={field.name}
              type={field.type}
              variant="outlined"
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
          {/* {isCapsLockOn && (
            <Typography variant="body2" color="gray">
              Caps Lock is on
            </Typography>
          )} */}
          <Button
            type="submit"
            size="medium"
            sx={{
              // marginTop: isSmallScreen ? 1 : 2,
              margin: "15px 0 15px 11px",
              padding: ".5rem 2.5rem",
              borderRadius: "8px",
              color: "#CB3037",
              fontWeight: "bold",
              boxShadow: "0px 2px 5px -2px rgba(0, 0, 0, 0.75)",
            }}
          >
            Sign in
          </Button>
        </form>
      </Box>
      <Divider sx={{ width: "70%", mx: "auto", mt: 3, mb: 2 }} />
      <Typography align="center" variant="subtitle1" color="text.secondary">
        Or sign in with
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
        <Tooltip title="Google Login">
          <IconButton
            onClick={() =>
              toast.error("Atyare Google thi login nai thai sorry!")
            }
            sx={{
              borderRadius: "50%",
              animation: `${googleColors} 4s infinite`,
            }}
          >
            <GoogleIcon />
          </IconButton>
        </Tooltip>
        <IconButton
          color="primary"
          onClick={() =>
            toast.error("Abhi Facebook se login nhi ho sakta sorry!")
          }
          sx={{ borderRadius: "50%", color: "#1877F2" }}
        >
          <FacebookIcon />
        </IconButton>
        <IconButton
          color="primary"
          onClick={() => toast.error("GitHub login not implemented yet")}
          sx={{ borderRadius: "50%", color: "#181717" }}
        >
          <GitHubIcon />
        </IconButton>
      </Stack>
      <MuiLink
        component="span"
        onClick={onSwitch}
        underline="none"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "text.secondary",
          cursor: "pointer",
          mt: "12px",
        }}
      >
        New to Vmail?{" "}
        <IconButton
          // color="primary"
          size="small"
          sx={{ background: "transparent", border: "none", color: "#CB3037" }}
        >
          Sign up
        </IconButton>
      </MuiLink>
    </Box>
  );
};

export default Login;
