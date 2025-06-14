import { useNavigate, useParams } from "react-router-dom";
import { Checkbox, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import KeyboardRoundedIcon from "@mui/icons-material/KeyboardRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import DraftsRoundedIcon from "@mui/icons-material/DraftsRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import RestoreFromTrashRoundedIcon from "@mui/icons-material/RestoreFromTrashRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import {
  deleteEmail,
  moveToTrash,
  removeFromTrash,
  toggleEmailProperty,
} from "../../apis/emailService";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import { useEmailContext } from "../../context/EmailContext";

const styles = {
  component: {
    padding: "5px",
    position: "sticky",
    top: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderBottom: "1px solid #f5f5f5",
  },
  wrapper: {
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
};

export default function EmailOptions(props) {
  const { emails } = useEmailContext();
  const { inbox, sent, drafts, trash } = emails;
  const [page, setPage] = useState(1);
  const [rowPerPage, setRowPerPage] = useState(10)
  const { category } = useParams();
  const handleChange = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    setPage(1);
  }, []);
  console.log('category', category)
  return (
    <div style={styles.component}>
      <div style={styles.wrapper}>{props.children}</div>

      <div style={styles.wrapper}>
        <Tooltip title="Pagination (beta) ">
          <Pagination count={Math.ceil(emails[category]?.length/rowPerPage) || 1} page={page} handleChange={handleChange} />
        </Tooltip>
      </div>
    </div>
  );
}

export function SelectOne() {
  return (
    <Tooltip title="Select (beta) ">
      <Checkbox />
    </Tooltip>
  );
}

export function SelectAll({ isSelected, handleSelectAll }) {
  return (
    <Tooltip title="Select all (beta) ">
      <Checkbox
        checked={isSelected}
        onChange={(e) => handleSelectAll(e.target.checked)}
      />
    </Tooltip>
  );
}

export function GoBack({ fetchEmails }) {
  const navigate = useNavigate();
  return (
    <Tooltip title="Back">
      <IconButton
        onClick={() => {
          navigate(-1);
          fetchEmails();
        }}
      >
        <ArrowBackRoundedIcon />
      </IconButton>
    </Tooltip>
  );
}

export function Refetch({ fetchEmails }) {
  const handleFetchEmails = async () => {
    toast.promise(fetchEmails(), {
      loading: "Fetching emails...",
      success: "Emails fetched successfully!",
      error: "Failed to fetch emails.",
    });
  };

  return (
    <Tooltip title="Refresh">
      <IconButton onClick={handleFetchEmails}>
        <RefreshRoundedIcon />
      </IconButton>
    </Tooltip>
  );
}

export function MarkUnread({ id, fetchEmails }) {
  const navigate = useNavigate();
  return (
    <Tooltip title="Mark as unread">
      <IconButton
        onClick={async () => {
          await toggleEmailProperty(id, "unread");
          fetchEmails();
          navigate(-1);
        }}
      >
        <DraftsRoundedIcon />
      </IconButton>
    </Tooltip>
  );
}

export function MarkStar({ id, isStarred, fetchEmails }) {
  return (
    <Tooltip title={isStarred ? "Unfavorite" : "Favorite"}>
      <IconButton
        onClick={async () => {
          await toggleEmailProperty(id, "favorite");
          fetchEmails();
        }}
      >
        {isStarred ? <StarRoundedIcon /> : <StarOutlineRoundedIcon />}
      </IconButton>
    </Tooltip>
  );
}

export function PlaceTrash({ id, isInTrash, fetchEmails }) {
  const handleMove = async () => {
    if (isInTrash) {
      try {
        const response = await removeFromTrash(id);
        fetchEmails();
        toast.success(response.data.message, { position: "top-center" });
      } catch (error) {
        toast.error(error.response.data.message, { position: "top-center" });
      }
    } else {
      try {
        const response = await moveToTrash(id);
        fetchEmails();
        toast.success(response.data.message, { position: "top-center" });
      } catch (error) {
        toast.error(error.response.data.message, { position: "top-center" });
      }
    }
    navigate(-1);
  };
  const navigate = useNavigate();
  return (
    <Tooltip title={isInTrash ? "Remove from trash" : "Move to trash"}>
      <IconButton onClick={handleMove}>
        {isInTrash ? <RestoreFromTrashRoundedIcon /> : <DeleteRoundedIcon />}
      </IconButton>
    </Tooltip>
  );
}

export function Delete({ id, fetchEmails }) {
  return (
    <Tooltip title="Delete">
      <IconButton
        onClick={async () => {
          try {
            const response = await deleteEmail(id);
            await fetchEmails();
            toast.success(response.data.message, { position: "top-center" });
          } catch (error) {
            toast.error(error.response.data.message, {
              position: "top-center",
            });
          }
        }}
      >
        <DeleteForeverRoundedIcon sx={{color:'#CB3037'}} />
      </IconButton>
    </Tooltip>
  );
}

export function More({ handleClick, hasSelectedEmails }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="More (beta) ">
        <IconButton onClick={handleClickMenu}>
          <MoreVertRoundedIcon />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {hasSelectedEmails ? (
          <>
            <MenuItem onClick={() => handleClick("markAsRead")}>
              Mark as Read
            </MenuItem>
            <MenuItem onClick={() => handleClick("deleteSelected")}>
              Delete Selected
            </MenuItem>
            <MenuItem onClick={() => handleClick("starSelected")}>
              Star Selected
            </MenuItem>
          </>
        ) : (
          <MenuItem onClick={() => handleClick("markAllAsRead")}>
            Mark all as Read
          </MenuItem>
        )}
      </Menu>
    </>
  );
}
