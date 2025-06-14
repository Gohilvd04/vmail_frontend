import apiCall from "./config/axiosConfig";
import { ENDPOINTS } from "./endpoints";

export const login = async (email, password) => {
  return apiCall({
    endpoint: ENDPOINTS.AUTH.LOGIN,
    method: "POST",
    data: { email, password },
  });
};

export const sendEmail = async (emailData) => {
  return apiCall({
    endpoint: ENDPOINTS.EMAIL.SEND,
    method: "POST",
    data: emailData,
  });
};

export const getAllEmails = async () => {
  return apiCall({
    endpoint: ENDPOINTS.EMAIL.BASE,
    method: "GET",
  });
}

export const getInboxEmails = async () => {
  return apiCall({
    endpoint: ENDPOINTS.EMAIL.INBOX,
    method: "GET",
  });
};

export const getSentEmails = async () => {
  return apiCall({
    endpoint: ENDPOINTS.EMAIL.SENT,
    method: "GET",
  });
};

export const getDrafts = async () => {
  return apiCall({
    endpoint: ENDPOINTS.EMAIL.DRAFTS,
    method: "GET",
  });
}

export const getTrash = async () => {
  return apiCall({
    endpoint: ENDPOINTS.EMAIL.TRASH,
    method: "GET",
  });
}

export const getEmailById = async (emailId) => {
  return apiCall({
    endpoint: `${ENDPOINTS.EMAIL.BASE}/${emailId}`,
    method: "GET",
  });
}


export const saveDraft = async (emailData) => {
  return apiCall({
    endpoint: `${ENDPOINTS.EMAIL.BASE}/draft`,
    method: "POST",
    data: emailData,
  });
};

export const updateDraft = async (draftId, emailData) => {
  return apiCall({
    endpoint: `${ENDPOINTS.EMAIL.BASE}/draft/${draftId}`,
    method: "PUT",
    data: emailData,
  });
};

export const moveToTrash = async (emailId) => {
  return apiCall({
    endpoint: `${ENDPOINTS.EMAIL.BASE}/${emailId}/trash`,
    method: "PUT",
  });
};

export const removeFromTrash = async (emailId) => {
  return apiCall({
    endpoint: `${ENDPOINTS.EMAIL.BASE}/${emailId}/untrash`,
    method: "PUT",
  });
};

export const toggleEmailProperty = async (emailId, property) => {
  return apiCall({
    endpoint: `${ENDPOINTS.EMAIL.BASE}/${emailId}/${property}`,
    method: "PUT",
  });
};

export const deleteEmail = async (emailId) => {
  return apiCall({
    endpoint: `${ENDPOINTS.EMAIL.BASE}/${emailId}`,
    method: "DELETE",
  });
};
