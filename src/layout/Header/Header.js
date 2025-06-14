// gmial logo
// import GmailLogo from "./assets/gmail-logo.png";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AppsIcon from "@mui/icons-material/Apps";
import { Avatar, Box, IconButton, Tooltip, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEmailContext } from "../../context/EmailContext";
import Logo from "../../assets/logo.png";
import NotificationList from "../../components/Notification/NotificationList";

export default function Header({ toggleShowSidebar }) {
  const { updateEmails } = useEmailContext();
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    updateEmails(null);
    toast.success("Logout Successfully", { position: "top-center" });
    navigate("/account");
  };

  return (
    <header
      style={{
        height: "90px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid #f5f5f5",
        position: "sticky",
        top: 0,
      }}
    >
      <div style={{ margin: "0 10px", display: "flex", alignItems: "center" }}>
        <IconButton onClick={toggleShowSidebar}>
          <MenuIcon />
        </IconButton>
        <img
          src={Logo}
          alt="gmail logo"
          style={{ height: "50px", objectFit: "contain", borderRadius: "50%" }}
        />
        <Typography
          fontSize={"35px"}
          fontWeight={"bold"}
          style={{
            margin: "0 10px",
            marginTop: "4px",
            color: "gray",
            fontFamily: "Arial, sans-serif",
          }}
        >
          Vmail
        </Typography>
      </div>

      <div
        style={{
          height: "55px",
          padding: "10px",
          display: "flex",
          flex: 0.7,
          alignItems: "center",
          backgroundColor: "#f5f5f5",
          borderRadius: "5px",
          overflow: "hidden",
        }}
      >
        <Tooltip title="Search (beta) ">
        <IconButton>
          <SearchIcon />
        </IconButton>
        </Tooltip>
        <input
          type="text"
          placeholder="Search mail"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "transparent",
            border: "none",
            outline: "none",
            fontSize: "medium",
          }}
        />
      </div>

      <div
        style={{
          position: "relative",
          margin: "0 10px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Tooltip title="Apps (beta) ">
          <IconButton>
            <AppsIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Notification">
          <NotificationList />
        </Tooltip>
        <Tooltip title="Logout">
          <IconButton onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Tooltip>
        <IconButton>
          <Avatar
            src={`https://source.unsplash.com/random/40x40/?face&man`}
            alt="User"
          />
        </IconButton>
        <Box flexDirection={"column"}>
          <Typography variant="body2">{user?.name}</Typography>
          <Typography variant="body2">{user?.email}</Typography>
        </Box>
      </div>
    </header>
  );
}
