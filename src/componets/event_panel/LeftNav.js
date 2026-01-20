import React, { useState, useEffect } from "react";
import { Nav, Offcanvas, Modal, Form, Button, Collapse } from "react-bootstrap";
import {
  FaTachometerAlt,
  FaSignOutAlt,
  FaFileAlt,
  FaPlus,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";
import axios from "axios";
import "../../assets/css/dashboard.css";
import { Link, useNavigate } from "react-router-dom";

const LeftNav = ({ sidebarOpen, setSidebarOpen, isMobile, isTablet, selectedPageId, setSelectedPageId }) => {
  const [showAddTitleModal, setShowAddTitleModal] = useState(false);
  const [pageTitle, setPageTitle] = useState("");
  const [pageSubtitle, setPageSubtitle] = useState("");
  const [pagesData, setPagesData] = useState([]);
  const [fetchingPages, setFetchingPages] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [expandedItems, setExpandedItems] = useState({});
  const navigate = useNavigate();

  // Fetch pages data from API when component mounts
  useEffect(() => {
    fetchPagesData();
  }, []);

  const fetchPagesData = async () => {
    try {
      setFetchingPages(true);
      const response = await axios.get(
        "https://mahadevaaya.com/eventmanagement/eventmanagement_backend/api/navbar-list/"
      );
      
      if (response.data) {
        setPagesData(response.data);
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
        { 
          page_title: pageTitle,
        
        }
      );
      
      setMessage("Page added successfully!");
      setPageTitle("");
      setPageSubtitle("");
      
      // Refresh the pages data after adding a new page
      await fetchPagesData();
      
      setTimeout(() => {
        setShowAddTitleModal(false);
        setMessage("");
      }, 1500);
    } catch (error) {
      setMessage("Error adding page. Please try again.");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageClick = (pageId, pageTitle, pageSubtitle) => {
    // Navigate to dashboard with page ID, page title, and page subtitle as state
    navigate(`/DashBoard`, { 
      state: { 
        pageId,
        pageTitle, // Pass the page title in the navigation state
        pageSubtitle // Pass the page subtitle in the navigation state
      } 
    });
    // Close sidebar on mobile after selection
    if (isMobile || isTablet) {
      setSidebarOpen(false);
    }
  };

  const toggleExpanded = (itemId) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  // Static menu items
  const staticMenuItems = [
    {
      icon: <FaTachometerAlt />,
      label: "Dashboard",
      path: "/DashBoard",
    },
    {
      icon: <FaPlus />,
      label: "Add Page",
      action: handleAddTitleClick,
    },
  ];

  // Recursive function to render menu items with children
  const renderMenuItem = (item, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems[item.id];
    
    return (
      <div key={item.id}>
        <Nav.Link
          className={`nav-item ${selectedPageId === item.id ? "active" : ""}`}
          style={{ paddingLeft: `${level * 15 + 15}px` }}
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.id);
            } else {
              handlePageClick(item.id, item.page_title, "");
            }
          }}
        >
          <span className="nav-icon">
            {hasChildren ? (
              isExpanded ? <FaChevronDown /> : <FaChevronRight />
            ) : (
              <FaFileAlt />
            )}
          </span>
          <div className="nav-text">
            <div>{item.page_title}</div>
          </div>
        </Nav.Link>
        
        {hasChildren && (
          <Collapse in={isExpanded}>
            <div>
              {item.children.map(child => renderMenuItem(child, level + 1))}
            </div>
          </Collapse>
        )}
      </div>
    );
  };

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
                // If item has an action (like Add Page)
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
          
          {/* Dynamic page items with hierarchical structure */}
          {pagesData.map(page => renderMenuItem(page))}
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
            
            {/* Dynamic page items for mobile with hierarchical structure */}
            {pagesData.map(page => renderMenuItem(page))}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Add Page Modal */}
      <Modal show={showAddTitleModal} onHide={() => setShowAddTitleModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Page</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleTitleSubmit}>
          <Modal.Body>
            <Form.Group controlId="pageTitle" className="mb-3">
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
              {isLoading ? "Saving..." : "Save Page"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default LeftNav;