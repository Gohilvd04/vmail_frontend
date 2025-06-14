// import React from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { Delete, MarkStar, SelectOne } from "../EmailOptions/EmailOptions";
// import { useEmailContext } from "../../context/EmailContext";

// const styles = {
//   item: {
//     padding: "7px 5px",
//     display: "flex",
//     alignItems: "center",
//     borderBottom: "1px solid #f5f5f5",
//   },
//   itemHover: {
//     borderTop: "1px solid #f5f5f5",
//     boxShadow: "0px 4px 4px -2px rgba(0, 0, 0, 0.25)",
//     position: "relative",
//     zIndex: 7,
//   },
//   message: {
//     display: "flex",
//     alignItems: "center",
//     width: "100%",
//     fontSize: "14px",
//     cursor: "pointer",
//   },
//   messageTitle: {
//     width: "200px",
//     marginLeft: "5px",
//     overflow: "hidden",
//     textOverflow: "ellipsis",
//   },
//   messageText: {
//     flex: 1,
//     whiteSpace: "nowrap",
//     overflow: "hidden",
//     textOverflow: "ellipsis",
//   },
//   messageSpan: {
//     width: "80px",
//     fontSize: "12px",
//     textAlign: "center",
//     whiteSpace: "nowrap",
//   },
//   unread: {
//     fontWeight: "bold",
//   },
//   read: {
//     backgroundColor: "#f5f5f5",
//   },
//   center: {
//     height: "100px",
//     display: "grid",
//     placeItems: "center",
//   },
// };

// //Email list item, each list item
// export default function EmailListItem({
//   id,
//   title,
//   subject,
//   message,
//   date,
//   isRead,
//   isStarred,
//   isTrash,
//   isDraft,
//   toggleIsCompose,
// }) {
//   const navigate = useNavigate();
//   const { category } = useParams();
//   const {fetchEmails} = useEmailContext()

//   // this function converts the date object to a sweet UI date string
//   const dateToString = (dateObj) => {
//     let day = new Date(dateObj).getDate();
//     let month = new Date(dateObj).getMonth();
//     const months = [
//       "Jan",
//       "Feb",
//       "Mar",
//       "Apr",
//       "May",
//       "Jun",
//       "Jul",
//       "Aug",
//       "Sep",
//       "Oct",
//       "Nov",
//       "Dec",
//     ];
//     return `${months[month]} ${day}`;
//   };

//   const itemStyles = {
//     ...styles.item,
//     ...(isRead || isTrash || isDraft ? styles.read : styles.unread),
//   };

//   const truncateText = (text, maxLength) => {
//     return text?.length > maxLength
//       ? text?.substring(0, maxLength) + "..."
//       : text;
//   };

//   return (
//     <div style={itemStyles} className="item-hover">
//       <SelectOne />
//       {isStarred !== undefined && <MarkStar id={id} isStarred={isStarred} fetchEmails={fetchEmails}/>}
//       {isTrash || isDraft ? <Delete id={id} fetchEmails={fetchEmails} /> : null}

//       <div
//         style={styles.message}
//         onClick={() =>
//           isDraft
//             ? toggleIsCompose(id)
//             : navigate(`/email/${category}/view/${id}`)
//         }
//       >
//         <h4 style={styles.messageTitle}>{truncateText(title, 21)}</h4>
//         &nbsp;&nbsp;
//         <p style={styles.messageText}>
//           <span>{truncateText(subject, 140)}</span>
//           &nbsp;&nbsp;
//           {message}
//         </p>
//         &nbsp;&nbsp;
//         <span style={styles.messageSpan}>{dateToString(date)}</span>
//       </div>
//     </div>
//   );
// }



// After select all

import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Checkbox } from "@mui/material";
import { SelectOne, MarkStar, Delete } from "../EmailOptions/EmailOptions";
import { useEmailContext } from "../../context/EmailContext";

const styles = {
  item: {
    padding: "7px 5px",
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid #f5f5f5",
  },
  itemHover: {
    borderTop: "1px solid #f5f5f5",
    boxShadow: "0px 4px 4px -2px rgba(0, 0, 0, 0.25)",
    position: "relative",
    zIndex: 7,
  },
  message: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    fontSize: "14px",
    cursor: "pointer",
  },
  messageTitle: {
    width: "200px",
    marginLeft: "5px",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  messageText: {
    flex: 1,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  messageSpan: {
    width: "80px",
    fontSize: "12px",
    textAlign: "center",
    whiteSpace: "nowrap",
  },
  unread: {
    fontWeight: "bold",
  },
  read: {
    backgroundColor: "#f5f5f5",
  },
};

const EmailListItem = ({
  id,
  title,
  subject,
  message,
  date,
  isRead,
  isStarred,
  isTrash,
  isDraft,
  toggleIsCompose,
  isSelected,
  handleSelectOne,
}) => {
  const navigate = useNavigate();
  const { category } = useParams();
  const { fetchEmails } = useEmailContext();

  const dateToString = (dateObj) => {
        let day = new Date(dateObj).getDate();
        let month = new Date(dateObj).getMonth();
        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        return `${months[month]} ${day}`;
      };
    
  const itemStyles = {
    ...styles.item,
    ...(isRead || isTrash || isDraft ? styles.read : styles.unread),
  };

  const truncateText = (text, maxLength) => {
    return text?.length > maxLength
      ? text?.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div style={itemStyles} className="item-hover">
      <Checkbox
        checked={isSelected}
        onChange={() => handleSelectOne(id)}
      />
      {isStarred !== undefined && <MarkStar id={id} isStarred={isStarred} fetchEmails={fetchEmails} />}
      {isTrash || isDraft ? <Delete id={id} fetchEmails={fetchEmails} /> : null}

      <div
        style={styles.message}
        onClick={() =>
          isDraft ? toggleIsCompose(id) : navigate(`/email/${category}/view/${id}`)
        }
      >
        <h4 style={styles.messageTitle}>{truncateText(title, 21)}</h4>
        &nbsp;&nbsp;
        <p style={styles.messageText}>
          <span>{truncateText(subject, 140)}</span>
          &nbsp;&nbsp;
          {message}
        </p>
        &nbsp;&nbsp;
        <span style={styles.messageSpan}>{dateToString(date)}</span>
      </div>
    </div>
  );
};

export default EmailListItem;
