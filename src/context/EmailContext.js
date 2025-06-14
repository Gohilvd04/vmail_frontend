import React, { createContext, useContext, useState, useEffect } from 'react';
import { getInboxEmails, getSentEmails, getDrafts, getTrash } from '../apis/emailService';

const EmailContext = createContext();

export const useEmailContext = () => useContext(EmailContext);

export const EmailProvider = ({ children }) => {
  const [emails, setEmails] = useState({
    inbox: [],
    sent: [],
    drafts: [],
    trash: [],
  });
  const [isCompose, setIsCompose] = useState(false);
  const [composeDraft, setComposeDraft] = useState(undefined);

  const toggleIsCompose = (id) => {
    setIsCompose(!isCompose);
    if (id) {
      emails.drafts.forEach((draft) => draft._id === id && setComposeDraft(draft));
    } else {
      setComposeDraft(undefined);
    }
  };

  const updateEmails = (values)=>{
    setEmails(values)
  }

  async function fetchEmails() {
    try {
      const inbox = await getInboxEmails();
      const sent = await getSentEmails();
      const drafts = await getDrafts();
      const trash = await getTrash();
      
      console.log('inbox', inbox)
      console.log('sent', sent)
      console.log('drafts',drafts)
      console.log('trash', trash)
      updateEmails({
        inbox:inbox.data.inboxEmails,
        sent:sent.data.sentEmails,
        drafts:drafts.data.drafts,
        trash:trash.data.trash,
      });
    } catch (error) {
      console.error('Error fetching emails:', error);
    }
  }

  useEffect(()=>{
    fetchEmails()
  },[])

  return (
    <EmailContext.Provider value={{ emails, isCompose, toggleIsCompose, composeDraft, setComposeDraft, updateEmails, fetchEmails }}>
      {children}
    </EmailContext.Provider>
  );
};
