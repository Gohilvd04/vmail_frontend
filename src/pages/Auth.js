import React, { useState } from "react";
import {
  Avatar,
  Box,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
// import Carousel from "../features/Auth/components/Carousel";
// import ForgotPasswordForm from "../features/Auth/components/ForgotPasswordForm";
// import LoginForm from "../features/Auth/components/LoginForm";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
// import Linkway from "../assets/linkway2.0.png";
import Gmail from "../assets/gmail.webp";
import Logo from "../assets/logo.png";

const Auth = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Box
        width={isSmallScreen ? "100%" : "100%"}
        height={"100%"}
        p={isSmallScreen ? 2 : 4}
        borderRadius={1}
        boxShadow={3}
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        sx={{ backgroundColor: "background.default" }}
      >
        {!isSmallScreen && (
          <Box
            width={{ xs: "100%", sm: "50%" }}
            pr={{ sm: isSmallScreen ? 0 : 2 }}
          >
            <Avatar
              src={Gmail}
              sx={{
                borderRadius: "1px",
                height: 700,
                width: 800,
              }}
            />
          </Box>
        )}

        <Box
          width={{ xs: "100%", sm: "50%" }}
          pl={{ sm: isSmallScreen ? 0 : 2 }}
          borderLeft={{ sm: isSmallScreen ? "none" : "1px solid #ccc" }}
          display="flex"
          alignItems="center"
          justifyContent={"center"}
        >
          <Stack
            display={"flex"}
            direction="column"
            justifyContent="center"
            alignItems={"center"}
            width="60%"
            height="80%"
            spacing={isSmallScreen ? 1 : 2}
            boxShadow={"2px 2px 8px 2px rgba(0, 0, 0, 0.3)"}
            borderRadius={"8px"}
          >
            <Box mb={isSmallScreen ? 2 : 3}>
              <Stack
                sx={{ display: "flex", justifyContent: "space-between" }}
                direction="row"
                spacing={isSmallScreen ? 1 : 2}
                alignItems="center"
              >
                <Box
                  // border={1}
                  width={"450px"}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    float: "right",
                    marginTop: "10px",
                  }}
                >
                  <Avatar src={Logo} alt="logo" sx={{ marginTop: "6px" }} />
                  <Typography
                    fontSize={"35px"}
                    sx={{ margin: "0 10px" }}
                    fontFamily="Arial, sans-serif"
                  >
                    Vmail
                  </Typography>
                </Box>
              </Stack>
            </Box>

            {showForgotPassword ? (
              <Register onSwitch={() => setShowForgotPassword(false)} />
            ) : (
              <Login onSwitch={() => setShowForgotPassword(true)} />
            )}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default Auth;
