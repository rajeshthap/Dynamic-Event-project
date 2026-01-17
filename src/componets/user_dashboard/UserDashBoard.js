import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

import "../../assets/css/dashboard.css";
import UserLeftNav from "./UserLeftNav";
import UserHeader from "./UserHeader";
// import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const UserDashBoard = () => {
//   const { logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Check device width
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      setSidebarOpen(width >= 1024);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <>
    <div className="dashboard-container">
      {/* Left Sidebar */}
      <UserLeftNav
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        isMobile={isMobile}
        isTablet={isTablet}
      />

      {/* Main Content */}
      <div className="main-content-dash">
        <UserHeader toggleSidebar={toggleSidebar} />

        <Container fluid className="dashboard-body dashboard-main-container">
          <h1 className="page-title">Dashboard</h1>
          <p>Welcome to the Dashboard!</p>
       
        </Container>
      </div>
    </div>
    </>
  );
};

export default UserDashBoard;
