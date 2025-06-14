import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import EmailLayout from "../layout/EmailLayout";
import Auth from "../pages/Auth";
import ProtectedRoute from "./ProtectedRoute";
import EmailCategory from "../components/EmailCategory/EmailCategory";
import EmailView from "../components/EmailView/EmailView";
import Inbox from "../components/Inbox/Inbox";

const App = () => {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/account" replace />} />

        <Route path="/account" element={<Auth />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/email/*" element={<EmailLayout />}>
            {/* <Route path=":inbox" element={<Inbox />} /> */}
            <Route path=":category" element={<EmailCategory />} />
            <Route path=":property/view/:id" element={<EmailView />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
