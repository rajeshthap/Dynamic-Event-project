import React, { useState, useEffect } from "react";
import { Card, Button, Spinner, Alert, Form, Modal, Row, Col } from "react-bootstrap";
import { FaEdit, FaPlus, FaTrash, FaTimes } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import Wysiwyg from "react-simple-wysiwyg";

const AboutUsEdit = ({ pageId, onEdit, show, onHide }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [itemImages, setItemImages] = useState({});
  const { token } = useAuth();

  // Fetch items when component mounts or pageId changes
  useEffect(() => {
    if (show && pageId) {
      fetchItems();
    }
  }, [show, pageId]);

  const fetchItems = async () => {
    try {
      setFetching(true);
      const res = await axios.get(
        "https://mahadevaaya.com/eventmanagement/eventmanagement_backend/api/aboutus-item/"
      );

      if (res.data.success) {
        // Filter items by pageId - check the page field
        const filtered = res.data.data.filter(
          (item) => String(item.page) === String(pageId)
        );
        
        // Process module items to ensure they have title and subtitle structure
        const processedItems = filtered.map(item => {
          if (item.module && Array.isArray(item.module)) {
            // Check if module items are strings (old format) or objects (new format)
            if (item.module.length > 0 && typeof item.module[0] === 'string') {
              // Convert old format (array of strings) to new format (array of objects)
              item.module = item.module.map(str => ({ title: str, subtitle: "" }));
            }
          }
          return item;
        });
        
        setItems(processedItems);
      }
    } catch (err) {
      console.error("Error fetching items:", err);
      setError("Failed to load items");
    } finally {
      setFetching(false);
    }
  };

  const addItem = () => setItems([...items, { 
    page: pageId, 
    title: "", 
    description: "", 
    image: null, 
    module: [] 
  }]);

  const updateItem = (i, field, value) => {
    const copy = [...items];
    copy[i][field] = value;
    setItems(copy);
  };

  const updateModuleItem = (itemIndex, moduleIndex, field, value) => {
    const copy = [...items];
    if (!copy[itemIndex].module[moduleIndex]) {
      copy[itemIndex].module[moduleIndex] = { title: "", subtitle: "" };
    }
    copy[itemIndex].module[moduleIndex][field] = value;
    setItems(copy);
  };

  const addModuleItem = (itemIndex) => {
    const copy = [...items];
    if (!copy[itemIndex].module) {
      copy[itemIndex].module = [];
    }
    copy[itemIndex].module.push({ title: "", subtitle: "" });
    setItems(copy);
  };

  const removeModuleItem = (itemIndex, moduleIndex) => {
    const copy = [...items];
    copy[itemIndex].module.splice(moduleIndex, 1);
    setItems(copy);
  };

  const handleItemImageChange = (index, file) => {
    setItemImages((prev) => ({ ...prev, [index]: file }));
  };

  const removeItem = async (index) => {
    const itemToRemove = items[index];
    if (itemToRemove.id) {
      try {
        if (!token) {
          setError("Authentication token not found. Please log in again.");
          return;
        }
        await axios.delete(
          `https://mahadevaaya.com/eventmanagement/eventmanagement_backend/api/aboutus-item/
 `,
          {
            data: { id: itemToRemove.id },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (err) {
        console.error("Error deleting item:", err);
        setError("Failed to delete item");
        return;
      }
    }
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Save each item
      for (const [index, item] of items.entries()) {
        const formData = new FormData();
        formData.append("page", pageId);
        formData.append("title", item.title);
        formData.append("description", item.description);
        
        // Add module array as JSON string
        if (item.module && item.module.length > 0) {
          formData.append("module", JSON.stringify(item.module));
        }

        if (itemImages[index]) {
          formData.append("image", itemImages[index]);
        }

        // If item has an ID, update it; otherwise create a new one
        if (item.id) {
          // Add the ID to the form data for the PUT request
          formData.append("id", item.id);
          
          // Check if token exists before making the request
          if (!token) {
            setError("Authentication token not found. Please log in again.");
            setLoading(false);
            return;
          }
          
          await axios.put(
            `https://mahadevaaya.com/eventmanagement/eventmanagement_backend/api/aboutus-item/
 `,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
        } else {
          // POST request for new items
          // Check if token exists before making the request
          if (!token) {
            setError("Authentication token not found. Please log in again.");
            setLoading(false);
            return;
          }
          
          await axios.post(
            "https://mahadevaaya.com/eventmanagement/eventmanagement_backend/api/aboutus-item/",
            formData,
           
          );
        }
      }

      setSuccess("Items updated successfully!");
      setTimeout(() => {
        onHide();
        onEdit("aboutus");
      }, 800);
    } catch (err) {
      console.error("Error saving items:", err);
      if (err.response?.status === 401) {
        setError("Authentication failed. Please log in again.");
      } else {
        setError("Save failed");
      }
    } finally {
      setLoading(false);
    }
  };

  // Function to get the correct image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // If it starts with a slash, it's a relative path from the domain root
    if (imagePath.startsWith('/')) {
      return `https://mahadevaaya.com${imagePath}`;
    }
    
    // Otherwise, it's a relative path from the API endpoint
    return `https://mahadevaaya.com/eventmanagement/eventmanagement_backend/${imagePath}`;
  };

  if (!show) return null;

  return (
    <Modal show={show} onHide={onHide} size="xl" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Edit About Us Items</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        {fetching ? (
          <Spinner animation="border" className="d-block mx-auto" />
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4>About Us Items</h4>
              <Button variant="outline-primary" onClick={addItem}>
                <FaPlus /> Add Item
              </Button>
            </div>

            {items.length === 0 ? (
              <Alert variant="info">No items found for this page. Click "Add Item" to create one.</Alert>
            ) : (
              items.map((item, index) => (
                <div key={item.id || index} className="card mb-3">
                  <div className="card-header d-flex justify-content-between">
                    <span>Item {index + 1}</span>
                    <Button size="sm" variant="danger" onClick={() => removeItem(index)}>
                      <FaTrash />
                    </Button>
                  </div>
                  <div className="card-body">
                    <Form.Group className="mb-3">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        placeholder="Title"
                        value={item.title || ""}
                        onChange={(e) => updateItem(index, "title", e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Description</Form.Label>
                      <Wysiwyg
                        value={item.description || ""}
                        onChange={(e) => updateItem(index, "description", e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Module Items</Form.Label>
                      <div className="mb-2">
                        {item.module && item.module.length > 0 ? (
                          item.module.map((moduleItem, moduleIndex) => (
                            <div key={moduleIndex} className="mb-3 p-3 border rounded">
                              <Row className="mb-2">
                                <Col lg={12}>
                                  <Form.Label className="small">Module Title</Form.Label>
                                  <Form.Control
                                    placeholder="Module title"
                                    value={moduleItem.title || ""}
                                    onChange={(e) => updateModuleItem(index, moduleIndex, "title", e.target.value)}
                                  />
                                </Col>
                                <Col lg={12}>
                                  <Form.Label className="small">Module Subtitle</Form.Label>
                                  <Form.Control
                                    placeholder="Module subtitle"
                                    value={moduleItem.subtitle || ""}
                                    onChange={(e) => updateModuleItem(index, moduleIndex, "subtitle", e.target.value)}
                                  />
                                </Col>
                                <Col sm={2} className="d-flex align-items-end">
                                  <Button 
                                    variant="outline-danger" 
                                    size="sm"
                                    onClick={() => removeModuleItem(index, moduleIndex)}
                                  >
                                    <FaTimes />
                                  </Button>
                                </Col>
                              </Row>
                            </div>
                          ))
                        ) : (
                          <p className="text-muted">No module items added</p>
                        )}
                      </div>
                      <Button 
                        variant="outline-secondary" 
                        size="sm"
                        onClick={() => addModuleItem(index)}
                      >
                        <FaPlus /> Add Module Item
                      </Button>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Image</Form.Label>
                      <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleItemImageChange(index, e.target.files[0])}
                      />
                    </Form.Group>

                    {item.image && (
                      <div className="mt-3">
                        <small className="text-muted d-block mb-2">Current Image:</small>
                        <img
                          src={getImageUrl(item.image)}
                          alt={item.title || "Item image"}
                          style={{ 
                            width: 120, 
                            height: 120, 
                            objectFit: 'cover',
                            marginTop: 10, 
                            borderRadius: 6,
                            border: '1px solid #ddd'
                          }}
                          onError={(e) => {
                            console.error("Image failed to load:", item.image);
                            // Try alternative path if the first one fails
                            if (!item.image.startsWith('http') && !item.image.startsWith('/')) {
                              e.target.src = `https://mahadevaaya.com/${item.image}`;
                            } else {
                              e.target.src = 'https://via.placeholder.com/120x120?text=No+Image';
                            }
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AboutUsEdit;