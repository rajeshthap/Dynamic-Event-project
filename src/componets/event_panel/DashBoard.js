import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Spinner,
  Alert,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import {
  fetchCardsByPage,
  refreshCards,
  fetchCardsForHome,
} from "./header/AllApi";
import "../../assets/css/dashboard.css";
import DashBoardHeader from "./DashBoardHeader";
import LeftNav from "./LeftNav";


import CardsGrid from "./header/CardsPage";
import EventCarousel from "../pages/EventCarousel";
import EditModal from "../../componets/event_panel/EditModal";

const DashBoard = () => {
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const [selectedPageId, setSelectedPageId] = useState(null);
  const [pageTitle, setPageTitle] = useState("Dashboard");
  const [pageSubtitle, setPageSubtitle] = useState("");
  const [pageData, setPageData] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  /* ============================
     PAGE ID FROM NAVIGATION
  ============================ */
  useEffect(() => {
    if (location.state?.pageId) {
      setSelectedPageId(location.state.pageId);
      setPageTitle(location.state.pageTitle || "Dashboard");
      setPageSubtitle(location.state.pageSubtitle || "");
    } else {
      setSelectedPageId(null);
      setPageData(null);
      setPageTitle("Dashboard");
      setPageSubtitle("");
    }
  }, [location]);

  /* ============================
     FETCH CARDS
  ============================ */
  useEffect(() => {
    if (selectedPageId) fetchPageData(selectedPageId);
  }, [selectedPageId]);

  const fetchPageData = async (pageId) => {
    setLoading(true);
    setError(null);

    try {
      const cards = await fetchCardsByPage(pageId);

      setPageData({
        content_type: "cards",
        cards,
      });
    } catch (err) {
      setError("Failed to load page data");
    } finally {
      setLoading(false);
    }
  };

  /* ============================
     DEVICE CHECK
  ============================ */
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

  /* ============================
     RENDER CARDS
  ============================ */
  const renderCards = () => {
    if (!pageData?.cards?.length) {
      return <p>No cards to display for this page.</p>;
    }

    return (
      <Row>
        <CardsGrid cards={pageData.cards} />
         <EventCarousel />
      </Row>
    );
  };

  return (
    <>
      <div className="dashboard-container">
        <LeftNav
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          isMobile={isMobile}
          isTablet={isTablet}
          selectedPageId={selectedPageId}
          setSelectedPageId={setSelectedPageId}
        />

        <div className="main-content-dash">
          <DashBoardHeader toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

          <Container fluid className="dashboard-body">
            {loading ? (
              <div className="d-flex justify-content-center my-5">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : error ? (
              <Alert variant="danger">{error}</Alert>
            ) : pageData ? (
              <>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h2>{pageTitle}</h2>
                    {pageSubtitle && <p className="text-muted">{pageSubtitle}</p>}
                  </div>
                  <Button onClick={() => setShowEditModal(true)}>
                    <FaEdit /> Edit
                  </Button>
                </div>
                {renderCards()}
              </>
            ) : (
              <div className="text-center my-5">
                <h3>Welcome to the Dashboard</h3>
                <p>
                  Please select a page from the left navigation to view its
                  content.
                </p>
              </div>
            )}
          </Container>
        </div>
      </div>

      <EditModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        pageId={selectedPageId}
        initialTitle={pageTitle}
        initialSubtitle={pageSubtitle}
        initialData={pageData}
        onSave={(componentType) => {
          if (componentType === "page_details") {
            // Refresh page data if page details were updated
            fetchPageData(selectedPageId);
          } else {
            // Refresh page data for other component updates
            fetchPageData(selectedPageId);
          }
        }}
      />
    </>
  );
};

export default DashBoard;