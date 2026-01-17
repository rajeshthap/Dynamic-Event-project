import React, { useContext, useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Badge,
  Dropdown,
  Image,
} from "react-bootstrap";
import {
  FaBars,
  FaBell,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaSearch,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { useAuth } from "../context/AuthContext";

// 1. Accept searchTerm and setSearchTerm as props
function UserHeader({ toggleSidebar, searchTerm, setSearchTerm }) {
 
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      text: "New employee joined - Rahul Sharma",
      time: "10 min ago",
      read: false,
    },
    {
      id: 2,
      text: "HR meeting scheduled at 4 PM",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      text: "Payroll processed successfully",
      time: "3 hours ago",
      read: true,
    },
  ]);

  const [unreadCount, setUnreadCount] = useState(2);
  
  // State for user details
  const [userDetails, setUserDetails] = useState({
    first_name: "",
    last_name: "",
    profile_photo: null,
  });



  const markAsRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    setUnreadCount((prev) => prev - 1);
  };
  // Get user photo URL
//   const { logout } = useAuth();
 
const handleLogout = () => {
    // logout();
    // navigate("/Login", { replace: true });
  };
  return (
    <header className="dashboard-header">
      <Container fluid>
        <Row className="align-items-center">
          <Col xs="auto">
            <Button
              variant="light"
              className="sidebar-toggle"
              onClick={toggleSidebar}
            >
              <FaBars />
            </Button>
          </Col>

          <Col>
          
          </Col>
          <Col xs="auto">
            <div className="header-actions">
              <Dropdown align="end">
                {/* <Dropdown.Toggle variant="light" className="notification-btn">
                  <FaBell />
                  {unreadCount > 0 && (
                    <Badge pill bg="danger" className="notification-badge">
                      {unreadCount}
                    </Badge>
                  )}
                </Dropdown.Toggle> */}

                {/* <Dropdown.Menu className="notification-dropdown">
                  <div className="notification-header">
                    <h6>Notifications</h6>
                  </div>

                  {notifications.map((notif) => (
                    <Dropdown.Item
                      key={notif.id}
                      className={`notification-item ${
                        !notif.read ? "unread" : ""
                      }`}
                      onClick={() => markAsRead(notif.id)}
                    >
                      <p>{notif.text}</p>
                      <small>{notif.time}</small>
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu> */}
              </Dropdown>

              <Dropdown align="end">
                <Dropdown.Toggle variant="light" className="user-profile-btn">
                  {/* <Image
                    src="photo"
                    roundedCircle
                    className="user-avatar"
                    onError={(e) => {
                      // Fallback to UI Avatars if image fails to load
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(getDisplayName())}&background=0d6efd&color=fff&size=40`;
                    }}
                  /> */}
                  <span className="user-name d-none d-md-inline">Admin</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleLogout}>
                    <FaSignOutAlt className="me-2" /> Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
}

export default UserHeader;