import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SidebarOption from "./SidebarOption";
import { Button } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import InboxRoundedIcon from "@mui/icons-material/InboxRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import NoteRoundedIcon from "@mui/icons-material/NoteRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useEmailContext } from "../../context/EmailContext";
// import { BorderRight } from "@mui/icons-material";

const styles = {
  container: {
    width: "240px",
    paddingRight: "10px",
    position: "sticky",
    top: 0,
    borderRight: "1px solid lightgray",
  },
  composeButton: {
    margin: "15px 0 15px 11px",
    padding: ".5rem 2rem",
    borderRadius: "8px",
    color: "#CB3037",
    textTransform: "capitalize",
    boxShadow: "0px 2px 5px -2px rgba(0, 0, 0, 0.75)",
  },
  showMoreOn: {
    transform: "rotate(0deg)",
  },
  showMoreOff: {
    transform: "rotate(-90deg)",
  },
};

const Sidebar = ({}) => {
  const { emails, toggleIsCompose } = useEmailContext();

  // if(!emails){
  //   return(
  //     <div>
  //       <h1>Loading...</h1>
  //     </div>
  //   )
  // }
  const { inbox, sent, drafts, trash } = emails;

  const uniqueStarredEmails = (emailsArray) => {
    const seen = new Set();
    return emailsArray.filter((email) => {
      const duplicate = seen.has(email._id);
      seen.add(email._id);
      return !duplicate;
    });
  };

  const starredEmails = uniqueStarredEmails(
    inbox
      ?.filter((email) => email.favorite)
      .concat(sent?.filter((email) => email.favorite))
      .concat(drafts?.filter((email) => email.favorite))
      .concat(trash?.filter((email) => email.favorite))
  );

  // console.log("starredEmails", starredEmails);
  const navigate = useNavigate();
  const location = useLocation();
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => setShowMore(!showMore);

  const createSidebarOption = (Icon, title, number, path) => (
    <SidebarOption
      Icon={Icon}
      title={title}
      number={number}
      onClick={() => navigate(path)}
      selected={location.pathname === path}
    />
  );

  return (
    <div style={styles.container}>
      <Button
        style={styles.composeButton}
        onClick={toggleIsCompose}
        startIcon={<AddRoundedIcon fontSize="large" />}
      >
        Compose
      </Button>

      {createSidebarOption(
        InboxRoundedIcon,
        "Inbox",
        inbox.length,
        "/email/inbox"
      )}
      {createSidebarOption(
        StarRoundedIcon,
        "Starred",
        starredEmails.length,
        "/email/starred"
      )}
      {createSidebarOption(
        NoteRoundedIcon,
        "Drafts",
        drafts.length,
        "/email/drafts"
      )}
      {createSidebarOption(SendRoundedIcon, "Sent", sent.length, "/email/sent")}

      <SidebarOption
        Icon={showMore ? ExpandMoreRoundedIcon : KeyboardArrowRightIcon}
        title="More"
        number=""
        onClick={toggleShowMore}
      />

      {showMore &&
        createSidebarOption(
          DeleteRoundedIcon,
          "Trash",
          trash.length,
          "/email/trash"
        )}
    </div>
  );
};

export default Sidebar;
