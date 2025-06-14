import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { Avatar, Divider } from "@mui/material";
import EmailOptions, {
  Delete,
  GoBack,
  MarkStar,
  MarkUnread,
  PlaceTrash,
} from "../EmailOptions/EmailOptions";
import { getEmailById, toggleEmailProperty } from "../../apis/emailService";
import { useEmailContext } from "../../context/EmailContext";

const EmailView = () => {
  const { fetchEmails } = useEmailContext();
  const { property, id } = useParams();
  console.log("property, id", property, id);

  const [emailToDisplay, setEmailToDisplay] = useState({});

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const response = await getEmailById(id);
        const markAsRead = async () => {
          await toggleEmailProperty(id, "read");
          fetchEmails()
          // setEmailToDisplay({ ...emailToDisplay, read: true })
          console.log('Read suceesfully')
        };
        markAsRead();
        console.log('response.data', response.data)
        setEmailToDisplay(response.data.email);
      } catch (error) {
        console.error("Error fetching email:", error);
      }
    };
    fetchEmail();
  }, [id]);

  console.log("emailToDisplay", emailToDisplay);

  const styles = {
    wrapper: {
      width: "100%",
      padding: "20px 0",
      display: "flex",
      justifyContent: "center",
    },
    container: {
      height: "80%",
      flex: 0.9,
      padding: "30px 15px",
      // boxShadow: "0px 5px 15px -5px rgba(0, 0, 0, 0.75)",
      overflow: "auto",
    },
    h3: {
      // marginLeft: "50px",
      fontSize: "28px",
    },
    header: {
      margin: "15px 0",

      display: "flex",
      alignItems: "center",
    },
    avatar: {
      marginRight: "10px",
    },
    message: {
      marginLeft: "15px",
    },
  };

  if (!emailToDisplay) {
    return <div>Email not found</div>;
  }

  return (
    <Fragment>
      <EmailOptions>
        <GoBack fetchEmails={fetchEmails}/>
        <PlaceTrash id={id} isInTrash={property === "trash"} fetchEmails={fetchEmails} />
        {property === "trash" ? <Delete id={id} fetchEmails={fetchEmails} /> : <MarkUnread id={id} fetchEmails={fetchEmails}/>}
        <MarkStar id={id} isStarred={emailToDisplay.favorite} fetchEmails={fetchEmails}/>
      </EmailOptions>

      <div style={styles.wrapper}>
        <div style={styles.container}>
          <h3 style={styles.h3}>{emailToDisplay.subject}</h3>
          <div style={styles.header}>
            <Avatar style={styles.avatar} />
            {emailToDisplay.from}
            <br />
            to me
          </div>
          <Divider sx={{mt:3, mb:2}}/>
          <p style={styles.message}>{emailToDisplay.message}</p>
        </div>
      </div>
    </Fragment>
  );
};

export default EmailView;
