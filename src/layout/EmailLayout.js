import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import ComposeMail from "../components/ComposeMail/ComposeMail";
import { useEmailContext } from "../context/EmailContext";

export default function EmailLayout() {
  const { isCompose } = useEmailContext();

  const [showSidebar, setShowSidebar] = useState(true);

  const toggleShowSidebar = () => setShowSidebar(!showSidebar);

  return (
    <>
      <nav>
        <Header toggleShowSidebar={toggleShowSidebar} />
      </nav>

      <main
        style={{
          height: "calc(100vh - 90px)",
          display: "flex",
          position: "sticky",
        }}
      >
        {showSidebar && <Sidebar />}

        <div style={{ flex: 1 }}>
          <Outlet />
        </div>

        {isCompose && <ComposeMail />}
      </main>
    </>
  );
}
