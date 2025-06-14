export const API_BASE_URL = process.env.REACT_APP_BASE_URL;

export const ENDPOINTS = {
  AUTH: {
    BASE: `/auth`,
    LOGIN: `/auth/login`,
    REGISTER: `/auth/register`,
    LOGOUT: `/auth/logout`,
  },
  EMAIL: {
    BASE: `/email`,
    SEND: `/email/send`,
    INBOX: `/email/inbox`,
    SENT: `/email/sent`,
    DRAFTS: `/email/drafts`,
    DRAFT: `/email/draft`,
    TRASH: `/email/trash`,
    UNTRASH: `/email/untrash`,
    TOGGLE_PROPERTY: `/email/toggle`,
  },
};
