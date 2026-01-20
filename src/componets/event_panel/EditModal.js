import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Alert, Row, Col, Card, Spinner } from "react-bootstrap";
import CardEdit from "./header/edit_pages/CardEdit";
import CarouselEdit from "./header/edit_pages/CarouselEdit";
import AboutUsEdit from "./header/edit_pages/AboutUsEdit";

const EditModal = ({ show, onHide, pageId, initialTitle, initialSubtitle, onSave }) => {
  const [selectedComponents, setSelectedComponents] = useState([]);
  const [showCardEdit, setShowCardEdit] = useState(false);
  const [showCarouselEdit, setShowCarouselEdit] = useState(false);
  const [showAboutUsEdit, setShowAboutUsEdit] = useState(false);
  const [currentEditingIndex, setCurrentEditingIndex] = useState(0);
  // Missing state variables - adding them here
  const [pageTitle, setPageTitle] = useState("");
  const [pageSubtitle, setPageSubtitle] = useState("");
  const [showSubtitleField, setShowSubtitleField] = useState(!!initialSubtitle);
  const [pageData, setPageData] = useState(null);
  const [updateMessage, setUpdateMessage] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [navbarList, setNavbarList] = useState([]);
  const [selectedPageId, setSelectedPageId] = useState(pageId || "");
  const [loadingNavbar, setLoadingNavbar] = useState(false);
  const [isAddingNewPage, setIsAddingNewPage] = useState(false);
  const [parentPageId, setParentPageId] = useState("");
  const [navOrder, setNavOrder] = useState("0");

  // Fetch navbar list when component mounts
  useEffect(() => {
    if (show) {
      fetchNavbarList();
    }
  }, [show]);

  // Fetch page data when selectedPageId changes
  useEffect(() => {
    if (selectedPageId && show && !isAddingNewPage) {
      fetchPageData(selectedPageId);
    }
  }, [selectedPageId, show, isAddingNewPage]);

  const fetchNavbarList = async () => {
    setLoadingNavbar(true);
    try {
      const response = await fetch(`https://mahadevaaya.com/eventmanagement/eventmanagement_backend/api/navbar-list/`);
      if (response.ok) {
        const data = await response.json();
        setNavbarList(data);
      } else {
        console.error("Failed to fetch navbar list. Status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching navbar list:", error);
    } finally {
      setLoadingNavbar(false);
    }
  };

  const fetchPageData = async (id) => {
    try {
      const response = await fetch(`https://mahadevaaya.com/eventmanagement/eventmanagement_backend/api/pages-item/${id}/`);
      if (response.ok) {
        const data = await response.json();
        setPageData(data);
        setPageTitle(data.page_title || initialTitle || "");
        setPageSubtitle(data.sub_title || initialSubtitle || "");
        setShowSubtitleField(!!(data.sub_title || initialSubtitle));
        setParentPageId(data.parent ? data.parent.toString() : "");
        setNavOrder(data.nav_order ? data.nav_order.toString() : "0");
      } else {
        console.error("Failed to fetch page data. Status:", response.status);
        const pageInNav = findPageInNav(id);
        if (pageInNav) {
          setPageTitle(pageInNav.page_title);
          setPageSubtitle(pageInNav.sub_title || "");
          setShowSubtitleField(!!pageInNav.sub_title);
        }
      }
    } catch (error) {
      console.error("Error fetching page data:", error);
      const pageInNav = findPageInNav(id);
      if (pageInNav) {
        setPageTitle(pageInNav.page_title);
        setPageSubtitle(pageInNav.sub_title || "");
        setShowSubtitleField(!!pageInNav.sub_title);
      }
    }
  };

  const findPageInNav = (id) => {
    for (const page of navbarList) {
      if (page.id === id) {
        return page;
      }
      if (page.children && page.children.length > 0) {
        for (const child of page.children) {
          if (child.id === id) {
            return child;
          }
        }
      }
    }
    return null;
  };

  // Recursive function to render navbar options with indentation for children
  const renderNavbarOptions = (items, level = 0) => {
    return items.map(item => (
      <React.Fragment key={item.id}>
        <option value={item.id} style={{ paddingLeft: `${level * 20}px` }}>
          {item.page_title}
        </option>
        {item.children && item.children.length > 0 && renderNavbarOptions(item.children, level + 1)}
      </React.Fragment>
    ));
  };

  const updatePageTitle = async () => {
    if (!selectedPageId && !isAddingNewPage) return;
    
    setIsUpdating(true);
    try {
      const payload = {
        parent: parentPageId || null,
        nav_order: navOrder,
        page_title: pageTitle,
      };
      
      // Only include sub_title if it's provided
      if (showSubtitleField) {
        payload.sub_title = pageSubtitle;
      }
      
      console.log("Payload being sent:", payload);
      
      // Use PUT with the ID in the URL for updates
      const response = await fetch(`https://mahadevaaya.com/eventmanagement/eventmanagement_backend/api/pages-item/${selectedPageId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        setUpdateMessage("Page details updated successfully!");
        setTimeout(() => setUpdateMessage(""), 3000);
        
        // Notify parent component of the update
        if (onSave) {
          onSave("page_details", {
            id: selectedPageId,
            title: pageTitle,
            subtitle: showSubtitleField ? pageSubtitle : ""
          });
        }
      } else {
        const errorData = await response.json();
        console.error("Failed to update page. Status:", response.status, "Error:", errorData);
        setUpdateMessage(`Failed to update page: ${errorData.detail || "Please try again."}`);
        setTimeout(() => setUpdateMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error updating page:", error);
      setUpdateMessage("Error updating page. Please try again.");
      setTimeout(() => setUpdateMessage(""), 3000);
    } finally {
      setIsUpdating(false);
    }
  };

  const addNewPage = async () => {
    if (!parentPageId || !pageTitle) return;
    
    setIsUpdating(true);
    try {
      const payload = {
        parent: parentPageId,
        nav_order: navOrder,
        page_title: pageTitle,
      };
      
      // Only include sub_title if it's provided
      if (showSubtitleField && pageSubtitle) {
        payload.sub_title = pageSubtitle;
      }
      
      console.log("Payload for new page:", payload);
      
      const response = await fetch(`https://mahadevaaya.com/eventmanagement/eventmanagement_backend/api/pages-item/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        setUpdateMessage("New page created successfully!");
        setTimeout(() => setUpdateMessage(""), 3000);
        
        // Reset form after successful creation
        setPageTitle("");
        setPageSubtitle("");
        setShowSubtitleField(false);
        setParentPageId("");
        setNavOrder("0");
        
        // Refresh navbar list to include the new page
        fetchNavbarList();
        
        // Notify parent component of the new page
        if (onSave) {
          onSave("page_details", {
            title: pageTitle,
            subtitle: showSubtitleField ? pageSubtitle : ""
          });
        }
      } else {
        const errorData = await response.json();
        console.error("Failed to create page. Status:", response.status, "Error:", errorData);
        setUpdateMessage(`Failed to create page: ${errorData.detail || "Please try again."}`);
        setTimeout(() => setUpdateMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error creating page:", error);
      setUpdateMessage("Error creating page. Please try again.");
      setTimeout(() => setUpdateMessage(""), 3000);
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    if (show) {
      // Reset state when modal opens
      setSelectedComponents([]);
      setShowCardEdit(false);
      setShowCarouselEdit(false);
      setShowAboutUsEdit(false);
      setCurrentEditingIndex(0);
      setSelectedPageId(pageId || "");
      setUpdateMessage("");
      setIsAddingNewPage(false);
      setParentPageId("");
      setNavOrder("0");
    }
  }, [show, pageId]);

  const handleComponentChange = (componentType, isChecked) => {
    if (isChecked) {
      // Add component to selected list
      setSelectedComponents([...selectedComponents, componentType]);
    } else {
      // Remove component from selected list
      setSelectedComponents(selectedComponents.filter(c => c !== componentType));
    }
  };

  const handleUpdatePageDetails = async () => {
    setLoading(true);
    try {
      if (isAddingNewPage) {
        await addNewPage();
      } else {
        await updatePageTitle();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEditComplete = (componentType) => {
    // Save page details if they were modified
    if (componentType === "page_details") {
      // Notify parent component that editing is complete with updated page details
      if (onSave) {
        onSave(componentType, {
          id: selectedPageId,
          title: pageTitle,
          subtitle: showSubtitleField ? pageSubtitle : ""
        });
      }
    } else {
      // Notify parent component that editing is complete
      if (onSave) {
        onSave(componentType);
      }
    }
  };

  const handleNext = () => {
    // If no components selected, don't proceed
    if (selectedComponents.length === 0) return;
    
    // Save page details if they were modified
    if (pageTitle !== initialTitle || pageSubtitle !== initialSubtitle) {
      handleEditComplete("page_details");
    }
    
    // Start with the first selected component
    setCurrentEditingIndex(0);
    const firstComponent = selectedComponents[0];
    
    // Show the appropriate component
    if (firstComponent === "cards") {
      setShowCardEdit(true);
      setShowCarouselEdit(false);
      setShowAboutUsEdit(false);
    } else if (firstComponent === "carousel") {
      setShowCarouselEdit(true);
      setShowCardEdit(false);
      setShowAboutUsEdit(false);
    } else if (firstComponent === "aboutus") {
      setShowAboutUsEdit(true);
      setShowCardEdit(false);
      setShowCarouselEdit(false);
    }
  };

  const moveToNextComponent = () => {
    // Check if there are more components to edit
    const nextIndex = currentEditingIndex + 1;
    
    if (nextIndex < selectedComponents.length) {
      // Move to the next component
      setCurrentEditingIndex(nextIndex);
      const nextComponent = selectedComponents[nextIndex];
      
      // Show the appropriate component
      if (nextComponent === "cards") {
        setShowCardEdit(true);
        setShowCarouselEdit(false);
        setShowAboutUsEdit(false);
      } else if (nextComponent === "carousel") {
        setShowCarouselEdit(true);
        setShowCardEdit(false);
        setShowAboutUsEdit(false);
      } else if (nextComponent === "aboutus") {
        setShowAboutUsEdit(true);
        setShowCardEdit(false);
        setShowCarouselEdit(false);
      }
    } else {
      // No more components to edit, close the modal
      onHide();
    }
  };

  const handlePageSelect = (e) => {
    const newPageId = e.target.value;
    setSelectedPageId(newPageId);
    setIsAddingNewPage(false);
    if (newPageId) {
      fetchPageData(newPageId);
    }
  };

  const handleParentPageSelect = (e) => {
    setParentPageId(e.target.value);
  };

  const handleNavOrderChange = (e) => {
    setNavOrder(e.target.value);
  };

  const toggleAddNewPage = () => {
    setIsAddingNewPage(!isAddingNewPage);
    setSelectedPageId("");
    setPageTitle("");
    setPageSubtitle("");
    setShowSubtitleField(false);
    setParentPageId("");
    setNavOrder("0");
  };

  return (
    <>
      <Modal show={show && !showCardEdit && !showCarouselEdit && !showAboutUsEdit} onHide={onHide} size="md" backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{isAddingNewPage ? "Add New Page" : "Select Components to Edit"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-3">
            <Col lg={12}>
              <Card className="shadow-sm">
                <Card.Body>
                  {/* Toggle between Edit and Add New Page */}
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <Form.Label className="fw-bold mb-0">Page Options</Form.Label>
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      onClick={toggleAddNewPage}
                    >
                      {isAddingNewPage ? "Edit Existing Page" : "Add New Page"}
                    </Button>
                  </div>

                  {isAddingNewPage ? (
                    // Add New Page Form
                    <>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Select Parent Page</Form.Label>
                        {loadingNavbar ? (
                          <div className="d-flex justify-content-center align-items-center py-3">
                            <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
                            <span className="ms-2">Loading pages...</span>
                          </div>
                        ) : (
                          <Form.Select 
                            value={parentPageId} 
                            onChange={handleParentPageSelect}
                          >
                            <option value="">Select a parent page...</option>
                            {renderNavbarOptions(navbarList)}
                          </Form.Select>
                        )}
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Navigation Order</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter navigation order"
                          name="nav_order"
                          value={navOrder}
                          onChange={handleNavOrderChange}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Page Title</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter page title"
                          name="page_title"
                          value={pageTitle}
                          onChange={(e) => setPageTitle(e.target.value)}
                        />
                      </Form.Group>

                      {/* Subtitle Section */}
                      <div className="mb-2">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <Form.Label className="fw-bold mb-0">
                            Subtitle <span className="text-muted">(Optional)</span>
                          </Form.Label>
                          {!showSubtitleField && (
                            <Button 
                              variant="outline-primary" 
                              size="sm"
                              onClick={() => setShowSubtitleField(true)}
                            >
                              Add Subtitle
                            </Button>
                          )}
                        </div>
                        
                        {showSubtitleField && (
                          <div>
                            <Form.Control
                              type="text"
                              placeholder="Enter subtitle if needed"
                              name="sub_title"
                              value={pageSubtitle}
                              onChange={(e) => setPageSubtitle(e.target.value)}
                              className="mb-2"
                            />
                            <Button 
                              variant="outline-secondary" 
                              size="sm"
                              onClick={() => {
                                setShowSubtitleField(false);
                                setPageSubtitle("");
                              }}
                            >
                              Remove Subtitle
                            </Button>
                          </div>
                        )}
                        
                        <Button 
                          variant="success" 
                          onClick={handleUpdatePageDetails}
                          disabled={loading || !parentPageId || !pageTitle}
                        >
                          {loading ? (
                            <>
                              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                              <span className="ms-2">Creating...</span>
                            </>
                          ) : (
                            "Create New Page"
                          )}
                        </Button>
                      </div>
                    </>
                  ) : (
                    // Edit Existing Page Form
                    <>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Select Page</Form.Label>
                        {loadingNavbar ? (
                          <div className="d-flex justify-content-center align-items-center py-3">
                            <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
                            <span className="ms-2">Loading pages...</span>
                          </div>
                        ) : (
                          <Form.Select 
                            value={selectedPageId} 
                            onChange={handlePageSelect}
                          >
                            <option value="">Select a page...</option>
                            {renderNavbarOptions(navbarList)}
                          </Form.Select>
                        )}
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Parent Page</Form.Label>
                        <Form.Select 
                          value={parentPageId} 
                          onChange={handleParentPageSelect}
                          disabled={!selectedPageId}
                        >
                          <option value="">None (Top Level)</option>
                          {renderNavbarOptions(navbarList)}
                        </Form.Select>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Navigation Order</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter navigation order"
                          name="nav_order"
                          value={navOrder}
                          onChange={handleNavOrderChange}
                          disabled={!selectedPageId}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Page Title</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter page title"
                          name="page_title"
                          value={pageTitle}
                          onChange={(e) => setPageTitle(e.target.value)}
                          disabled={!selectedPageId}
                        />
                      </Form.Group>

                      {/* Subtitle Section */}
                      <div className="mb-2">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <Form.Label className="fw-bold mb-0">
                            Subtitle <span className="text-muted">(Optional)</span>
                          </Form.Label>
                          {!showSubtitleField && selectedPageId && (
                            <Button 
                              variant="outline-primary" 
                              size="sm"
                              onClick={() => setShowSubtitleField(true)}
                            >
                              Add Subtitle
                            </Button>
                          )}
                        </div>
                        
                        {showSubtitleField && (
                          <div>
                            <Form.Control
                              type="text"
                              placeholder="Enter subtitle if needed"
                              name="sub_title"
                              value={pageSubtitle}
                              onChange={(e) => setPageSubtitle(e.target.value)}
                              className="mb-2"
                            />
                            <Button 
                              variant="outline-secondary" 
                              size="sm"
                              onClick={() => {
                                setShowSubtitleField(false);
                                setPageSubtitle("");
                              }}
                            >
                              Remove Subtitle
                            </Button>
                          </div>
                        )}
                        
                        <Button 
                          variant="primary" 
                          onClick={handleUpdatePageDetails}
                          disabled={loading || !selectedPageId}
                        >
                          {loading ? (
                            <>
                              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                              <span className="ms-2">Updating...</span>
                            </>
                          ) : (
                            "Update Page Details"
                          )}
                        </Button>
                      </div>
                    </>
                  )}
                    
                    {updateMessage && (
                      <Alert variant={updateMessage.includes("success") ? "success" : "danger"} className="mt-2 py-2">
                        {updateMessage}
                      </Alert>
                    )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
          {!isAddingNewPage && (
            <Form.Group className="mb-3">
              <Form.Label>Choose components to edit:</Form.Label>
              <div className="d-flex flex-column gap-2 p-3 border rounded">
                <Form.Check
                  type="checkbox"
                  id="cards-checkbox"
                  label="Cards Component"
                  checked={selectedComponents.includes("cards")}
                  onChange={(e) => handleComponentChange("cards", e.target.checked)}
                  disabled={!selectedPageId}
                />
                <Form.Check
                  type="checkbox"
                  id="carousel-checkbox"
                  label="Carousel Component"
                  checked={selectedComponents.includes("carousel")}
                  onChange={(e) => handleComponentChange("carousel", e.target.checked)}
                  disabled={!selectedPageId}
                />
                <Form.Check
                  type="checkbox"
                  id="aboutus-checkbox"
                  label="About Us Component"
                  checked={selectedComponents.includes("aboutus")}
                  onChange={(e) => handleComponentChange("aboutus", e.target.checked)}
                  disabled={!selectedPageId}
                />
              </div>
              <Form.Text className="text-muted">
                Select one or more components to edit
              </Form.Text>
            </Form.Group>
          )}
          
          {selectedComponents.length > 0 && !isAddingNewPage && (
            <div className="mt-3">
              <h6>Selected Components:</h6>
              <ul>
                {selectedComponents.map((component, index) => (
                  <li key={index}>{component}</li>
                ))}
              </ul>
            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Cancel</Button>
          {!isAddingNewPage && (
            <Button 
              variant="primary" 
              onClick={handleNext}
              disabled={selectedComponents.length === 0 || !selectedPageId}
            >
              Next
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      {/* Card Edit Modal */}
      <CardEdit
        show={showCardEdit}
        onHide={() => {
          setShowCardEdit(false);
          moveToNextComponent();
        }}
        pageId={selectedPageId}
        onEdit={handleEditComplete}
      />

      {/* Carousel Edit Modal */}
      <CarouselEdit
        show={showCarouselEdit}
        onHide={() => {
          setShowCarouselEdit(false);
          moveToNextComponent();
        }}
        pageId={selectedPageId}
        onEdit={handleEditComplete}
      />
      
      {/* About Us Edit Modal */}
      <AboutUsEdit
        show={showAboutUsEdit}
        onHide={() => {
          setShowAboutUsEdit(false);
          moveToNextComponent();
        }}
        pageId={selectedPageId}
        onEdit={handleEditComplete}
      />
    </>
  );
};

export default EditModal;