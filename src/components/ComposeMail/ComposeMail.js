// import { useFormik } from "formik";
// import { TextField, Button, Box, Typography } from "@mui/material";
// import * as Yup from "yup";
// import { saveDraft, sendEmail, updateDraft } from "../../apis/emailService";
// import toast from "react-hot-toast";
// import { useEmailContext } from "../../context/EmailContext";
// import {addNotification} from '../../firebase/services';

// const ComposeMail= ()=> {
//   const { toggleIsCompose, composeDraft, fetchEmails } = useEmailContext()
//   const user = JSON.parse(localStorage.getItem("user"));
//   const registeredEmail = user.email;

//   const formik = useFormik({

//     initialValues: {
//       from: registeredEmail,
//       to: composeDraft?.to || "",
//       subject: composeDraft?.subject || "",
//       message: composeDraft?.message || "",
//     },

//     validationSchema: Yup.object({
//       to: Yup.string().email("Invalid email").required("Recipient is required"),
//       subject: Yup.string().required("Subject is required"),
//       message: Yup.string().required("Email message is required"),
//     }),

//     onSubmit: async (values, { resetForm }) => {
//       try {
//         let response;
//         if (!composeDraft) {
//           let form = {
//             from:values.from,
//             to: values.to,
//             subject: values.subject,
//             message: values.message,
//           };
//           response = await sendEmail(form);
//           fetchEmails()
//         } else {
//           response =  await sendEmail(values);
//           fetchEmails()
//           // await updateDraft(composeDraft._id, values);
//         }
//         console.log("res", response)
//         toast.success(response.data.message, { position: "top-center" });

//         // Add notification
//         const notification = {
//           to: values.to,
//           subject: values.subject,
//           message: values.message,
//           from: values.from,
//           emailId:response.data.email._id,
//           user: {
//             name: user.name,
//             email: user.email,
//           },
//         };
//         await addNotification(notification);

//         toggleIsCompose();
//       } catch (error) {
//         resetForm()
//         console.error("Error:", error);
//         toast.error(error.response.data.message, {
//           position: "top-center",
//         });
//       }
//     },
//   });

//   const onClose = async () => {
//     try {
//       if (!composeDraft) {
//         if (
//           formik.values.to ||
//           formik.values.subject ||
//           formik.values.message
//         ) {
//           let form = {
//             from: formik.values.from,
//             to: formik.values.to,
//             subject: formik.values.subject,
//             message: formik.values.message,
//           };
//           const response = await saveDraft(form);
//           fetchEmails()
//           toast.success(response.data.message, { position: "top-center" });
//         }
//       } else {
//         let form = {
//           from: formik.values.from,
//           to: formik.values.to,
//           subject: formik.values.subject,
//           message: formik.values.message,
//         };
//         const response = await updateDraft(composeDraft._id, form);
//         fetchEmails()
//         toast.success(response.data.message, { position: "top-center" });
//       }
//       toggleIsCompose();
//     } catch (error) {
//       console.error("Error:", error);
//       toast.error(error.response.data.message, {
//         position: "top-center",
//       });
//     }
//   };

//   const styles = {
//     compose: {
//       width: "350px",
//       height: "420px",
//       position: "fixed",
//       bottom: 0,
//       right: "11%",
//       backgroundColor: "#fff",
//       border: "none",
//       borderRadius: "10px 10px 0 0",
//       fontSize: "15px",
//       boxShadow: "0px 2px 10px -2px rgba(0, 0, 0, 0.75)",
//       zIndex: 8,
//     },
//     header: {
//       padding: "10px 15px",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "space-between",
//       backgroundColor: "#505050",
//       borderRadius: "10px 10px 0 0",
//       color: "#fff",
//     },
//     inpGroup: {
//       padding: "7px 15px",
//       display: "flex",
//       alignItems: "center",
//       borderBottom: "1px solid #f5f5f5",
//     },
//     label: {
//       marginRight: "7px",
//       cursor: "text",
//     },
//     input: {
//       width: "100%",
//       border: "none",
//       outline: "none",
//     },
//     textarea: {
//       padding: "7px 15px",
//     },
//     send: {
//       height: "42px",
//       display: "flex",
//       alignItems: "center",
//     },
//     sendButton: {
//       margin: "0 10px",
//       backgroundColor: "#1e6df6",
//       borderRadius: "10px",
//       color: "#fff",
//       textTransform: "capitalize",
//     },
//     sendButtonHover: {
//       backgroundColor: "#4b8ef9",
//     },
//     closeButton: {
//       cursor: "pointer",
//     },
//   };

//   return (
//     <form onSubmit={formik.handleSubmit} style={styles.compose}>
//       <Box style={styles.header}>
//         <Typography variant="h6">New Email</Typography>
//         <Typography variant="h6" style={styles.closeButton} onClick={onClose}>
//           &times;
//         </Typography>
//       </Box>

//       <Box style={styles.inpGroup}>
//         <label htmlFor="from" style={styles.label}>
//           From:
//         </label>
//         <TextField
//           name="from"
//           id="from"
//           type="email"
//           value={formik.values.from}
//           InputProps={{
//             readOnly: true,
//           }}
//           fullWidth
//           variant="standard"
//         />
//       </Box>

//       <Box style={styles.inpGroup}>
//         <label htmlFor="to" style={styles.label}>
//           To:
//         </label>
//         <TextField
//           name="to"
//           id="to"
//           type="email"
//           value={formik.values.to}
//           onChange={formik.handleChange}
//           error={formik.touched.to && Boolean(formik.errors.to)}
//           helperText={formik.touched.to && formik.errors.to}
//           fullWidth
//           variant="standard"
//         />
//       </Box>

//       <Box style={styles.inpGroup}>
//         <label htmlFor="subject" style={styles.label}>
//           Subject:
//         </label>
//         <TextField
//           name="subject"
//           id="subject"
//           type="text"
//           value={formik.values.subject}
//           onChange={formik.handleChange}
//           error={formik.touched.subject && Boolean(formik.errors.subject)}
//           helperText={formik.touched.subject && formik.errors.subject}
//           fullWidth
//           variant="standard"
//         />
//       </Box>

//       <TextField
//         name="message"
//         id="message"
//         placeholder="Message"
//         value={formik.values.message}
//         onChange={formik.handleChange}
//         multiline
//         rows={5}
//         fullWidth
//         variant="standard"
//         style={styles.textarea}
//       />

//       <Box style={styles.send}>
//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           style={styles.sendButton}
//         >
//           Send
//         </Button>
//       </Box>
//     </form>
//   );
// }

// export default ComposeMail;

import React from "react";
import { useFormik } from "formik";
import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import * as Yup from "yup";
import { useEmailContext } from "../../context/EmailContext";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DraftsIcon from "@mui/icons-material/Drafts";
import DeleteIcon from "@mui/icons-material/Delete";
import toast from "react-hot-toast";
import { sendEmail, updateDraft, saveDraft } from "../../apis/emailService";
import { addNotification } from "../../firebase/services";

const ComposeMail = () => {
  const { toggleIsCompose, composeDraft, fetchEmails } = useEmailContext();
  const user = JSON.parse(localStorage.getItem("user"));
  const registeredEmail = user.email;

  const formik = useFormik({
    initialValues: {
      from: registeredEmail,
      to: composeDraft?.to || "",
      subject: composeDraft?.subject || "",
      message: composeDraft?.message || "",
      attachments: composeDraft?.attachments || [],
    },

    validationSchema: Yup.object({
      to: Yup.string().email("Invalid email").required("Recipient is required"),
      subject: Yup.string().required("Subject is required"),
      message: Yup.string().required("Email message is required"),
    }),

    onSubmit: async (values, { resetForm }) => {
      try {
        let response;
        if (!composeDraft) {
          let form = {
            from: values.from,
            to: values.to,
            subject: values.subject,
            message: values.message,
            attachments: values.attachments,
          };
          response = await sendEmail(form);
          fetchEmails();
        } else {
          response = await sendEmail(values);
          fetchEmails();
          // await updateDraft(composeDraft._id, values);
        }
        console.log("res", response);
        toast.success(response.data.message, { position: "top-center" });

        // Add notification
        const notification = {
          to: values.to,
          subject: values.subject,
          message: values.message,
          from: values.from,
          emailId: response.data.email._id,
          user: {
            name: user.name,
            email: user.email,
          },
        };
        await addNotification(notification);

        toggleIsCompose();
      } catch (error) {
        resetForm();
        console.error("Error:", error);
        toast.error(error.response.data.message, {
          position: "top-center",
        });
      }
    },
  });

  const onClose = async () => {
    try {
      if (!composeDraft) {
        if (
          formik.values.to ||
          formik.values.subject ||
          formik.values.message
        ) {
          let form = {
            from: formik.values.from,
            to: formik.values.to,
            subject: formik.values.subject,
            message: formik.values.message,
          };
          const response = await saveDraft(form);
          fetchEmails();
          toast.success(response.data.message, { position: "top-center" });
        }
      } else {
        let form = {
          from: formik.values.from,
          to: formik.values.to,
          subject: formik.values.subject,
          message: formik.values.message,
        };
        const response = await updateDraft(composeDraft._id, form);
        fetchEmails();
        toast.success(response.data.message, { position: "top-center" });
      }
      toggleIsCompose();
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.message, {
        position: "top-center",
      });
    }
  };

  const styles = {
    compose: {
      width: "500px",
      height: "450px",
      position: "fixed",
      bottom: 0,
      right: "11%",
      backgroundColor: "#fff",
      border: "none",
      borderRadius: "10px 10px 0 0",
      fontSize: "15px",
      boxShadow: "0px 2px 10px -2px rgba(0, 0, 0, 0.75)",
      zIndex: 8,
    },
    header: {
      padding: "10px 15px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#505050",
      borderRadius: "10px 10px 0 0",
      color: "#fff",
    },
    inpGroup: {
      padding: "7px 15px",
      display: "flex",
      alignItems: "center",
      borderBottom: "1px solid #f5f5f5",
    },
    label: {
      marginRight: "7px",
      cursor: "text",
    },
    input: {
      width: "100%",
      border: "none",
      outline: "none",
    },
    textarea: {
      padding: "7px 15px",
    },
    send: {
      height: "42px",
      display: "flex",
      alignItems: "center",
      },
    sendButton: {
      margin: "0 10px",
      backgroundColor: "#1e6df6",
      borderRadius: "10px",
      color: "#fff",
      textTransform: "capitalize",
    },
    sendButtonHover: {
      backgroundColor: "#4b8ef9",
    },
    closeButton: {
      cursor: "pointer",
    },
    iconButton: {
      padding: 0,
      marginRight: "15px",
    },
  };

  const handleDraft = async()=>{
    let form = {
      from: formik.values.from,
      to: formik.values.to,
      subject: formik.values.subject,
      message: formik.values.message,
    };
    const response = await saveDraft(form);
    fetchEmails();
    toast.success(response.data.message, { position: "top-center" });
    toggleIsCompose();
  }

  const handleCancel = () =>{
    toggleIsCompose()
  }
  return (
    <form onSubmit={formik.handleSubmit} style={styles.compose}>
      <Box style={styles.header}>
        <Typography variant="h6">New Email</Typography>
        <Tooltip title="Delete draft">
        </Tooltip>
        <Tooltip title="Save as draft">
          <IconButton style={styles.iconButton} onClick={handleDraft}>
            <DraftsIcon sx={{ color: "white" }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Close">
          <Typography variant="h5" style={styles.closeButton} onClick={onClose}>
            &times;
          </Typography>
        </Tooltip>
      </Box>

      <Box style={styles.inpGroup}>
        <label htmlFor="from" style={styles.label}>
          From:
        </label>
        <TextField
          name="from"
          id="from"
          type="email"
          value={formik.values.from}
          InputProps={{
            readOnly: true,
          }}
          fullWidth
          variant="standard"
        />
      </Box>

      <Box style={styles.inpGroup}>
        <label htmlFor="to" style={styles.label}>
          To:
        </label>
        <TextField
          name="to"
          id="to"
          type="email"
          value={formik.values.to}
          onChange={formik.handleChange}
          error={formik.touched.to && Boolean(formik.errors.to)}
          helperText={formik.touched.to && formik.errors.to}
          fullWidth
          variant="standard"
        />
      </Box>

      <Box style={styles.inpGroup}>
        <label htmlFor="subject" style={styles.label}>
          Subject:
        </label>
        <TextField
          name="subject"
          id="subject"
          type="text"
          value={formik.values.subject}
          onChange={formik.handleChange}
          error={formik.touched.subject && Boolean(formik.errors.subject)}
          helperText={formik.touched.subject && formik.errors.subject}
          fullWidth
          variant="standard"
        />
      </Box>

      <TextField
        name="message"
        id="message"
        placeholder="Message"
        value={formik.values.message}
        onChange={formik.handleChange}
        multiline
        rows={5}
        fullWidth
        variant="standard"
        style={styles.textarea}
      />

      <Box style={styles.send}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={styles.sendButton}
        >
          Send
        </Button>
        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={handleCancel}
          style={styles.sendButton}
        >
          Cancel
        </Button>
        <Tooltip title="Add attachments (beta) ">
          <IconButton style={styles.iconButton}>
            <AttachFileIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </form>
  );
};

export default ComposeMail;
