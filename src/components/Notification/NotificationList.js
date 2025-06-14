import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Tooltip,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useEmailContext } from "../../context/EmailContext";
import { useNavigate } from "react-router-dom";
import { getDocs, query, collection, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import { COLLECTIONS } from "../../firebase/collections";
import { deleteNotification } from "../../firebase/services";
import CloseIcon from "@mui/icons-material/Close";

const NotificationList = () => {
  const { emails } = useEmailContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const userEmail = user.email;

  useEffect(() => {
    const fetchNotifications = async () => {
      const notificationQuery = query(
        collection(db, COLLECTIONS.NOTIFICATION),
        where("to", "==", userEmail)
      );
      const querySnapshot = await getDocs(notificationQuery);
      const fetchedNotifications = [];
      querySnapshot?.forEach((doc) => {
        fetchedNotifications.push(doc.data());
      });
      setNotifications(fetchedNotifications);
    };

    fetchNotifications();
  }, [emails, userEmail]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setShowAll(false);
  };

  const handleItemClick = async (notification) => {
    try {
      await deleteNotification(notification.id);
      setNotifications(notifications.filter((n) => n.id !== notification.id));
      navigate(`/email/inbox/view/${notification.emailId}`);
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
    handleClose();
  };

  const handleShowAllClick = () => {
    setShowAll(true);
  };

  const truncateText = (text, maxLength) => {
    return text?.length > maxLength
      ? text?.substring(0, maxLength) + "..."
      : text;
  };

  const handleNotificationDelete = async (e, id) => {
    e.stopPropagation();
    try {
      await deleteNotification(id);
      setNotifications(notifications.filter((n) => n.id !== id));
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  return (
    <Box>
      <IconButton onClick={handleClick}>
        <Tooltip title="Notifications">
          <Badge badgeContent={notifications?.length} color="error">
            <NotificationsIcon />
          </Badge>
        </Tooltip>
      </IconButton>
      <Menu
        sx={{ border: 1, borderRadius: "8px", borderColor: "divider" }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: "400px",
            width: "360px",
            border: 4,
            borderRadius: "8px",
            borderColor: "divider",
          },
        }}
      >
        <List>
          {notifications?.map((notification) => (
            <ListItem
              sx={{ cursor: "pointer" }}
              key={notification.id}
              onClick={() => handleItemClick(notification)}
            >
              <ListItemText
                primary={
                  <>
              <Typography fontSize={'14px'}>from : {notification.from}</Typography>

                  <Typography variant="subtitle1" fontWeight="bold">
                    {truncateText(notification.subject, 35)}
                  </Typography>
                  </>
                }
                secondary={
                  <Typography variant="body2">
                    {truncateText(notification.message, 35)}
                  </Typography>
                }
              />
              <IconButton
                onClick={(e) => handleNotificationDelete(e, notification.id)}
              >
                <CloseIcon />
              </IconButton>
            </ListItem>
          ))}
          {notifications?.length === 0 && (
            <MenuItem disabled>
              <Typography>No new notifications</Typography>
            </MenuItem>
          )}
        </List>
        {!showAll && notifications?.length > 5 && (
          <MenuItem onClick={handleShowAllClick}>
            <Typography sx={{ color: "#CB3037" }}>
              Show All Notifications
            </Typography>
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
};

export default NotificationList;
