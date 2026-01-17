import React, { useState, useEffect } from "react";
import { Nav, Offcanvas, Modal, Form, Button } from "react-bootstrap";
import {
  FaTachometerAlt,
  FaSignOutAlt,
  FaFileAlt,
  FaPlus,
} from "react-icons/fa";
import axios from "axios";
import "../../assets/css/dashboard.css";
import { Link, useNavigate } from "react-router-dom";

const LeftNav = ({ sidebarOpen, setSidebarOpen, isMobile, isTablet, selectedPageId, setSelectedPageId }) => {
  const [showAddTitleModal, setShowAddTitleModal] = useState(false);
  const [pageTitle, setPageTitle] = useState("");
  const [pagesData, setPagesData] = useState([]);
  const [fetchingPages, setFetchingPages] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Fetch pages data from API when component mounts
  useEffect(() => {
    fetchPagesData();
  }, []);

  const fetchPagesData = async () => {
    try {
      setFetchingPages(true);
      const response = await axios.get(
        "https://mahadevaaya.com/eventmanagement/eventmanagement_backend/api/pages-item/"
      );
      
      if (response.data.success) {
        setPagesData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching pages data:", error);
    } finally {
      setFetchingPages(false);
    }
  };

  const handleAddTitleClick = () => {
    setShowAddTitleModal(true);
    setSidebarOpen(false); // Close sidebar when modal opens
  };

  const handleTitleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "https://mahadevaaya.com/eventmanagement/eventmanagement_backend/api/pages-item/",
        { page_title: pageTitle }
      );
      
      setMessage("Title added successfully!");
      setPageTitle("");
      
      // Refresh the pages data after adding a new title
      await fetchPagesData();
      
      setTimeout(() => {
        setShowAddTitleModal(false);
        setMessage("");
      }, 1500);
    } catch (error) {
      setMessage("Error adding title. Please try again.");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageClick = (pageId, pageTitle) => {
    // Navigate to dashboard with page ID and page title as state
    navigate(`/DashBoard`, { 
      state: { 
        pageId,
        pageTitle // Pass the page title in the navigation state
      } 
    });
    // Close sidebar on mobile after selection
    if (isMobile || isTablet) {
      setSidebarOpen(false);
    }
  };

  // Static menu items
  const staticMenuItems = [
    {
      icon: <FaTachometerAlt />,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: <FaPlus />,
      label: "Add Title",
      action: handleAddTitleClick,
    },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={`sidebar ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}
      >
        <div className="sidebar-header">
          <div className="logo-container">
            <div className="logo"></div>
          </div>
        </div>

        <Nav className="sidebar-nav flex-column">
          {staticMenuItems.map((item, index) => (
            <div key={index}>
              {item.action ? (
                // If item has an action (like Add Title)
                <Nav.Link
                  className="nav-item"
                  onClick={item.action}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-text">{item.label}</span>
                </Nav.Link>
              ) : (
                // Regular navigation link
                <Link
                  to={item.path}
                  className="nav-item nav-link"
                  onClick={() => {
                    setSelectedPageId(null);
                    if (isMobile || isTablet) setSidebarOpen(false);
                  }}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-text">{item.label}</span>
                </Link>
              )}
            </div>
          ))}
          
          {/* Dynamic page items */}
          {pagesData.map(page => (
            <div key={page.id}>
              <Nav.Link
                className={`nav-item ${selectedPageId === page.id ? "active" : ""}`}
                onClick={() => handlePageClick(page.id, page.page_title)} // Pass both page ID and title
              >
                <span className="nav-icon"><FaFileAlt /></span>
                <span className="nav-text">{page.page_title}</span>
              </Nav.Link>
            </div>
          ))}
        </Nav>

        <div className="sidebar-footer">
          <Nav.Link className="nav-item logout-btn">
            <span className="nav-icon">
              <FaSignOutAlt />
            </span>
            <span className="nav-text">Logout</span>
          </Nav.Link>
        </div>
      </div>

      {/* Mobile / Tablet Sidebar (Offcanvas) */}
      <Offcanvas
        show={(isMobile || isTablet) && sidebarOpen}
        onHide={() => setSidebarOpen(false)}
        className="mobile-sidebar"
        placement="start"
        backdrop={true}
        scroll={false}
        enforceFocus={false}
      >
        <Offcanvas.Header closeButton className="br-offcanvas-header">
          <Offcanvas.Title className="br-off-title">Menu</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body className="br-offcanvas">
          <Nav className="flex-column">
            {staticMenuItems.map((item, index) => (
              <div key={index}>
                {item.action ? (
                  <Nav.Link
                    className="nav-item"
                    onClick={item.action}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-text br-nav-text-mob">{item.label}</span>
                  </Nav.Link>
                ) : (
                  <Link
                    to={item.path}
                    className="nav-item nav-link"
                    onClick={() => {
                      setSelectedPageId(null);
                      setSidebarOpen(false);
                    }}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-text br-nav-text-mob">{item.label}</span>
                  </Link>
                )}
              </div>
            ))}
            
            {/* Dynamic page items for mobile */}
            {pagesData.map(page => (
              <div key={page.id}>
                <Nav.Link
                  className={`nav-item ${selectedPageId === page.id ? "active" : ""}`}
                  onClick={() => handlePageClick(page.id, page.page_title)} // Pass both page ID and title
                >
                  <span className="nav-icon"><FaFileAlt /></span>
                  <span className="nav-text br-nav-text-mob">{page.page_title}</span>
                </Nav.Link>
              </div>
            ))}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Add Title Modal */}
      <Modal show={showAddTitleModal} onHide={() => setShowAddTitleModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Page Title</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleTitleSubmit}>
          <Modal.Body>
            <Form.Group controlId="pageTitle">
              <Form.Label>Page Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter page title"
                value={pageTitle}
                onChange={(e) => setPageTitle(e.target.value)}
                required
              />
            </Form.Group>
            {message && (
              <div className={`mt-3 ${message.includes("Error") ? "text-danger" : "text-success"}`}>
                {message}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddTitleModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Title"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default LeftNav;