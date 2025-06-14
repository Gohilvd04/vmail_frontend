//Working category

// import React, { Fragment, useMemo } from "react";
// import { useParams } from "react-router-dom";
// import { useEmailContext } from "../../context/EmailContext";
// import EmailOptions, {
//   More,
//   Refetch,
//   SelectAll,
// } from "../EmailOptions/EmailOptions";
// import EmailListItem from "./EmailListItem";
// import { Box, Grid, Typography, styled } from "@mui/material";
// import toast from "react-hot-toast";
// import MailOutlineIcon from "@mui/icons-material/MailOutline";

// const EmailCategory = () => {
//   const { category } = useParams();
//   const { emails, toggleIsCompose, fetchEmails } = useEmailContext();
//   const user = JSON.parse(localStorage.getItem("user"));
//   const userEmail = user.email;

//   // if (!emails) {
//   //   return (
//   //     <div>
//   //       <h1>Loading...</h1>
//   //     </div>
//   //   );
//   // }

//   const StyledBox = styled(Box)({
//     height: "80vh",
//     overflowY: "auto",
//     "&:hover::-webkit-scrollbar-thumb": {
//       background: "#8888888c",
//     },
//     "&::-webkit-scrollbar": {
//       width: "8px",
//     },
//     "&::-webkit-scrollbar-thumb": {
//       background: "#cccccc",
//     },
//   });
//   console.log("emails", emails);
//   const styles = {
//     center: {
//       height: "100vh",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       border: "1px solid black",
//     },
//   };
//   const renderEmailList = () => {
//     let categoryEmails = [];

//     if (category === "starred") {
//       // Collect all starred emails from all categories
//       const uniqueEmails = new Set();
//       Object.keys(emails)?.forEach((key) => {
//         emails[key]?.forEach((email) => {
//           if (email.favorite && !uniqueEmails.has(email._id)) {
//             uniqueEmails.add(email._id);
//             categoryEmails.push(email);
//           }
//         });
//       });
//     } else {
//       categoryEmails = emails[category] || [];
//     }

//     const categoryType = category === "outbox" ? "sent" : category;

//     if (!categoryEmails?.length) {
//       return (
//         <Grid
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//             // width: "98vw",
//             height: "80vh",
//           }}
//         >
//           <Grid >
//             <MailOutlineIcon sx={{ height: "30vh", width: "30vw", color:'#818181' }} />
//           </Grid>
//           <Typography variant="h5">{`${categoryType} is empty...`}</Typography>
//         </Grid>
//       );
//     }

//     console.log("categoryEmails", categoryEmails);
//     return (
//       <Fragment>
//         <EmailOptions>
//           <SelectAll />
//           <Refetch fetchEmails={fetchEmails} />
//           <More />
//         </EmailOptions>
//         <StyledBox>
//           {categoryEmails?.map((item) => (
//             <EmailListItem
//               key={item._id}
//               id={item._id}
//               title={
//                 categoryType === "sent"
//                   ? `To: ${item.to}`
//                   : item.from === userEmail
//                   ? "me"
//                   : item.from
//               }
//               subject={item.subject}
//               message={item.body}
//               date={item.createdAt}
//               isRead={item.read}
//               isStarred={item.favorite}
//               isDraft={category === "drafts"}
//               isTrash={category === "trash"}
//               toggleIsCompose={
//                 category === "drafts" ? toggleIsCompose : undefined
//               }
//             />
//           ))}
//         </StyledBox>
//       </Fragment>
//     );
//   };

//   return (
//     <Fragment>
//       {renderEmailList() || (
//         <div className={styles.center}>Invalid category...</div>
//       )}
//     </Fragment>
//   );
// };

// export default EmailCategory;

//After select all

import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useEmailContext } from "../../context/EmailContext";
import EmailOptions, {
  More,
  Refetch,
  SelectAll,
} from "../EmailOptions/EmailOptions";
import EmailListItem from "./EmailListItem";
import {
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

const EmailCategory = () => {
  const { category } = useParams();
  const { emails, toggleIsCompose, fetchEmails } = useEmailContext();
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const user = JSON.parse(localStorage.getItem("user"));
  const userEmail = user.email;

  useEffect(() => {
    // Reset selected emails when category changes
    setSelectedEmails([]);
  }, [category, emails]);

  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      // Select all emails
      const categoryEmails = getEmailsByCategory();
      const allEmailIds = categoryEmails.map((email) => email._id);
      console.log("allEmailIds", allEmailIds);
      setSelectedEmails(allEmailIds);
    } else {
      // Deselect all emails
      setSelectedEmails([]);
    }
  };

  // const handleDeleteSelected = async ()=>{
  //   console.log('allEmailIds', selectedEmails)
  // }

  const handleSelectOne = (id) => {
    setSelectedEmails((prevSelectedEmails) =>
      prevSelectedEmails.includes(id)
        ? prevSelectedEmails.filter((emailId) => emailId !== id)
        : [...prevSelectedEmails, id]
    );
  };

  const getEmailsByCategory = () => {
    let categoryEmails = [];
    if (category === "starred") {
      // Collect all starred emails from all categories
      const uniqueEmails = new Set();
      Object.keys(emails)?.forEach((key) => {
        emails[key]?.forEach((email) => {
          if (email.favorite && !uniqueEmails.has(email._id)) {
            uniqueEmails.add(email._id);
            categoryEmails.push(email);
          }
        });
      });
    } else {
      categoryEmails = emails[category] || [];
    }
    return categoryEmails;
  };

  const renderEmailList = () => {
    const categoryEmails = getEmailsByCategory();
    const categoryType = category === "outbox" ? "sent" : category;

    if (!categoryEmails.length) {
      return (
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <Grid>
            <MailOutlineIcon
              sx={{ height: "30vh", width: "30vw", color: "#818181" }}
            />
          </Grid>
          <Typography variant="h5">{`${categoryType} is empty...`}</Typography>
        </Grid>
      );
    }
    const handleClickMore = (action) => {
      if (action === "markAsRead") {
        handleMarkAsRead();
      } else if (action === "deleteSelected") {
        handleDeleteSelected();
      } else if (action === "starSelected") {
        handleStarSelected();
      }
    };

    return (
      <Fragment>
        <EmailOptions>
          <SelectAll
            isSelected={selectedEmails.length === categoryEmails.length}
            handleSelectAll={handleSelectAll}
          />
          <Refetch fetchEmails={fetchEmails} />
          <More
            handleClick={handleClickMore}
            hasSelectedEmails={selectedEmails.length > 0}
          />
        </EmailOptions>
        <StyledBox>
          {categoryEmails.map((item) => (
            <EmailListItem
              key={item._id}
              id={item._id}
              title={
                categoryType === "sent"
                  ? `To: ${item.to}`
                  : item.from === userEmail
                  ? "me"
                  : item.from
              }
              subject={item.subject}
              message={item.body}
              date={item.createdAt}
              isRead={item.read}
              isStarred={item.favorite}
              isDraft={category === "drafts"}
              isTrash={category === "trash"}
              toggleIsCompose={
                category === "drafts" ? toggleIsCompose : undefined
              }
              isSelected={selectedEmails.includes(item._id)}
              handleSelectOne={handleSelectOne}
            />
          ))}
        </StyledBox>
      </Fragment>
    );
  };

  const StyledBox = styled(Box)({
    height: "80vh",
    overflowY: "auto",
    "&:hover::-webkit-scrollbar-thumb": {
      background: "#8888888c",
    },
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#cccccc",
    },
  });

  const handleMarkAsRead = () => {
    console.log("ids", selectedEmails);
  };
  const handleDeleteSelected = () => {
    console.log("ids", selectedEmails);
  };
  const handleStarSelected = () => {
    console.log("ids", selectedEmails);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Fragment>{renderEmailList() || <div>Invalid category...</div>}</Fragment>
  );
};

export default EmailCategory;

// import React, { Fragment, useEffect, useMemo } from "react";
// import { useParams } from "react-router-dom";
// import { useEmailContext } from "../../context/EmailContext";
// import EmailOptions, { More, Refetch, SelectAll } from "../EmailOptions/EmailOptions";
// import EmailListItem from "./EmailListItem";
// import { Box, Button, styled } from "@mui/material";
// import axios from "axios";
// import { addNotification, getNotification } from "../../firebase/services";

// const EmailCategory = () => {
//   const { category } = useParams();
//   const { emails, toggleIsCompose } = useEmailContext();
//   const user = JSON.parse(localStorage.getItem("user"));
//   const userEmail = user.email;

//   const StyledBox = styled(Box)({
//     height: '80vh',
//     overflowY: 'auto',
//     '&:hover::-webkit-scrollbar-thumb': {
//       background: '#8888888c',
//     },
//     '&::-webkit-scrollbar': {
//       width: '8px',
//     },
//     '&::-webkit-scrollbar-thumb': {
//       background: '#cccccc',
//     },
//   });

//   const styles = {
//     center: {
//       height: "100px",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//     },
//   };

//   const renderEmailList = () => {
//     let categoryEmails = [];

//     if (category === "starred") {
//       // Collect all starred emails from all categories
//       Object.keys(emails).forEach((key) => {
//         categoryEmails = categoryEmails.concat(
//           emails[key]?.filter((email) => email.favorite)
//         );
//       });
//     } else {
//       categoryEmails = emails[category] || [];
//     }

//     const categoryType = category === "outbox" ? "sent" : category;

//     if (!categoryEmails.length) {
//       return (
//         <div style={styles.center}>{`${categoryType} is empty...`}</div>
//       );
//     }

//     return (
//       <Fragment>
//         <EmailOptions>
//           <SelectAll />
//           <Refetch />
//           <More />
//         </EmailOptions>
//         <StyledBox>
//           {categoryEmails.map((item) => (
//             <EmailListItem
//               key={item._id}
//               id={item._id}
//               title={
//                 categoryType === "sent"
//                   ? `To: ${item.to}`
//                   : item.from === userEmail
//                     ? "me"
//                     : item.from
//               }
//               subject={item.subject}
//               message={item.body}
//               date={item.createdAt}
//               isRead={item.read}
//               isStarred={item.favorite}
//               isDraft={category === "drafts"}
//               isTrash={category === "trash"}
//               toggleIsCompose={category === "drafts" ? toggleIsCompose : undefined}
//             />
//           ))}
//         </StyledBox>
//       </Fragment>
//     );
//   }

//   useEffect(() => {
//     const fetchNotification = async () => {

//       try {
//         const res = await getNotification('Da7ZMzYhQITuokeZzuJB ')
//         console.log('res', res)
//       } catch (error) {
//         console.log('error', error)
//       }
//     }
//     fetchNotification()

//   }, [])

//   return (
//     <Fragment>
//       {renderEmailList || (
//         <div style={styles.center}>Invalid category...</div>
//       )}

//       <Button onClick={async () => {
//         try {
//           const res = await addNotification({ email: "babu@gmail.com", name: "babu bhai", msg: "email is received" });
//           console.log('res', res)
//         } catch (error) {
//           console.log('error', error)
//         }
//       }}>add notification</Button>
//     </Fragment>
//   );
// };

// export default EmailCategory;
