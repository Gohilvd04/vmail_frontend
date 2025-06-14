import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getUserAction } from './redux/actions/accountActions';
import "./App.css";
import { Toaster } from "react-hot-toast";

import AppRoutes from "./routes/Routes";
import { EmailProvider } from "./context/EmailContext";

function App() {
  // if a token exists, try to get the user data from the server,
  // if this fetch has succeeded, App will redirect us to the emails page
  // if this fetch failed, that means the token has expired and the user needs to login

  // useEffect(() => {
  //   if (token) {
  //     dispatch(getUserAction());
  //   }
  // }, [token, dispatch]);

  return (
    <EmailProvider>
      <Toaster position="top-center" reverseOrder={true} />
      <AppRoutes />
    </EmailProvider>
  );
}

export default App;
