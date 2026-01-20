import React, { useEffect, useState } from "react";
import { Carousel, Button, Spinner, Alert, Form, Modal } from "react-bootstrap";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import Wysiwyg from "react-simple-wysiwyg";

const CarouselEdit = ({ pageId, onEdit, show, onHide }) => {
  const [carouselItems, setCarouselItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [carouselImages, setCarouselImages] = useState({});
  const [imagePreviews, setImagePreviews] = useState({});
  const { token } = useAuth();

  // Base URL for the API
  const API_BASE_URL = "https://mahadevaaya.com";
  const API_ENDPOINT = "https://mahadevaaya.com/eventmanagement/eventmanagement_backend/api/carousel1-item/";

  // Reset state when modal closes
  useEffect(() => {
    if (!show) {
      setCarouselItems([]);
      setCarouselImages({});
      setImagePreviews({});
      setError("");
      setSuccess("");
    }
  }, [show]);

  // Fetch carousel items when component mounts or pageId changes
  useEffect(() => {
    if (show) {
      fetchCarouselItems();
    }
  }, [show]); // Removed pageId dependency to fetch all items

  const fetchCarouselItems = async () => {
    try {
      setFetching(true);
      setError("");
      
      // Check if token exists before making the request
      if (!token) {
        setError("Authentication token not found. Please log in again.");
        setFetching(false);
        return;
      }
      
      const res = await axios.get(API_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        // Process image URLs to ensure they're complete
        const processedItems = res.data.data.map(item => {
          // Handle different image path formats
          let imageUrl = null;
          
          if (item.image) {
            console.log("Original image path:", item.image);
            
            if (item.image.startsWith('http')) {
              // Already a full URL
              imageUrl = item.image;
            } else if (item.image.startsWith('/media/')) {
              // Media path from Django
              imageUrl = `${API_BASE_URL}${item.image}`;
            } else if (item.image.startsWith('/')) {
              // Relative path starting with /
              imageUrl = `${API_BASE_URL}${item.image}`;
            } else {
              // Relative path without leading /
              imageUrl = `${API_BASE_URL}/${item.image}`;
            }
            
            console.log("Processed image URL:", imageUrl);
          }
          
          return {
            ...item,
            image: imageUrl
          };
        });
        
        setCarouselItems(processedItems);
        console.log("Fetched carousel items:", processedItems);
      } else {
        setError("Failed to load carousel items: API returned unsuccessful response");
      }
    } catch (err) {
      console.error("Error fetching carousel items:", err);
      if (err.response?.status === 401) {
        setError("Authentication failed. Your session may have expired. Please log in again.");
      } else {
        setError(`Failed to load carousel items: ${err.response?.data?.message || err.message}`);
      }
    } finally {
      setFetching(false);
    }
  };

  const addCarouselItem = () => 
    setCarouselItems([...carouselItems, { 
      page: pageId, // Set the page ID for new items
      title: "", 
      sub_title: "", 
      description: "", 
      image: null 
    }]);

  const updateCarouselItem = (i, field, value) => {
    const copy = [...carouselItems];
    copy[i][field] = value;
    setCarouselItems(copy);
  };

  const handleCarouselImageChange = (index, file) => {
    if (file) {
      setCarouselImages((prev) => ({ ...prev, [index]: file }));
      
      // Create a preview for the newly selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => ({ ...prev, [index]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeCarouselItem = async (index) => {
    const itemToRemove = carouselItems[index];
    if (itemToRemove.id) {
      try {
        if (!token) {
          setError("Authentication token not found. Please log in again.");
          return;
        }
        await axios.delete(
          `${API_ENDPOINT}`,
          {
            data: { id: itemToRemove.id },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (err) {
        console.error("Error deleting carousel item:", err);
        setError("Failed to delete carousel item");
        return;
      }
    }
    setCarouselItems(carouselItems.filter((_, i) => i !== index));
    // Clean up image state for the removed item
    const newCarouselImages = { ...carouselImages };
    const newImagePreviews = { ...imagePreviews };
    delete newCarouselImages[index];
    delete newImagePreviews[index];
    setCarouselImages(newCarouselImages);
    setImagePreviews(newImagePreviews);
  };

  const handleSave = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Check if token exists before making the request
      if (!token) {
        setError("Authentication token not found. Please log in again.");
        setLoading(false);
        return;
      }

      // Validate carousel items before saving
      const invalidItems = carouselItems.filter(item => !item.title || !item.description);
      if (invalidItems.length > 0) {
        setError("All carousel items must have a title and description");
        setLoading(false);
        return;
      }

      // Save each carousel item
      for (const [index, item] of carouselItems.entries()) {
        const formData = new FormData();
        // Ensure page ID is set for all items
        formData.append("page", item.page || pageId);
        formData.append("title", item.title);
        formData.append("sub_title", item.sub_title || "");
        formData.append("description", item.description);

        if (carouselImages[index]) {
          formData.append("image", carouselImages[index]);
        }

        // If item has an ID, update it; otherwise create a new one
        if (item.id) {
          // Add the ID to the form data for the PUT request
          formData.append("id", item.id);
          
          await axios.put(
            `${API_ENDPOINT}`,
            formData,
            { 
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
        } else {
          await axios.post(
            API_ENDPOINT,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
        }
      }

      setSuccess("Carousel updated successfully!");
      setTimeout(() => {
        onHide();
        onEdit("carousel");
      }, 800);
    } catch (err) {
      console.error("Error saving carousel items:", err);
      if (err.response?.status === 401) {
        setError("Authentication failed. Your session may have expired. Please log in again.");
      } else {
        setError(`Save failed: ${err.response?.data?.message || err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <Modal show={show} onHide={onHide} size="xl" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Edit Carousel</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        {fetching ? (
          <div className="text-center py-4">
            <Spinner animation="border" />
            <p className="mt-2">Loading carousel items...</p>
          </div>
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4>Carousel Items ({carouselItems.length})</h4>
              <Button variant="outline-primary" onClick={addCarouselItem}>
                <FaPlus /> Add Carousel Item
              </Button>
            </div>

            {carouselItems.length === 0 ? (
              <Alert variant="info">No carousel items found. Add an item to get started.</Alert>
            ) : (
              carouselItems.map((item, index) => (
                <div key={index} className="card mb-3">
                  <div className="card-header d-flex justify-content-between">
                    <span>Carousel Item {index + 1} {item.id && `(ID: ${item.id})`} {item.page && `(Page: ${item.page})`}</span>
                    <Button size="sm" variant="danger" onClick={() => removeCarouselItem(index)}>
                      <FaTrash />
                    </Button>
                  </div>
                  <div className="card-body">
                    <Form.Group className="mb-3">
                      <Form.Label>Page</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Page ID"
                        value={item.page || pageId}
                        onChange={(e) => updateCarouselItem(index, "page", e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        placeholder="Title"
                        value={item.title}
                        onChange={(e) => updateCarouselItem(index, "title", e.target.value)}
                        isInvalid={!item.title}
                      />
                      <Form.Control.Feedback type="invalid">
                        Title is required
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Sub-title</Form.Label>
                      <Form.Control
                        placeholder="Sub-title (optional)"
                        value={item.sub_title || ""}
                        onChange={(e) => updateCarouselItem(index, "sub_title", e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Description</Form.Label>
                      <Wysiwyg
                        value={item.description}
                        onChange={(e) => updateCarouselItem(index, "description", e.target.value)}
                        isInvalid={!item.description}
                      />
                      <Form.Control.Feedback type="invalid">
                        Description is required
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Image</Form.Label>
                      <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleCarouselImageChange(index, e.target.files[0])}
                      />
                    </Form.Group>

                    {/* Show image preview for new images or existing images */}
                    {(imagePreviews[index] || item.image) && (
                      <div className="mt-2">
                        <Form.Label>Image Preview</Form.Label>
                        <div className="position-relative d-inline-block">
                          <img
                            src={imagePreviews[index] || item.image}
                            alt="Carousel preview"
                            style={{ 
                              width: "150px", 
                              height: "150px", 
                              objectFit: "cover",
                              borderRadius: "50%", // This makes the image circular
                              border: "3px solid #ddd",
                              padding: "2px",
                              backgroundColor: "#f8f9fa"
                            }}
                            onLoad={() => console.log("Image loaded successfully:", imagePreviews[index] || item.image)}
                            onError={(e) => {
                              console.error("Image failed to load:", e.target.src);
                              // Try alternative URL format
                              if (!imagePreviews[index] && item.image && !item.image.includes('/media/')) {
                                const altUrl = `${API_BASE_URL}/media/${item.image.split('/').pop()}`;
                                console.log("Trying alternative URL:", altUrl);
                                e.target.src = altUrl;
                                e.target.onerror = () => {
                                  console.error("Alternative URL also failed");
                                  e.target.onerror = null;
                                  e.target.src = "https://via.placeholder.com/150x150?text=Image+Not+Found";
                                };
                              } else {
                                e.target.onerror = null;
                                e.target.src = "https://via.placeholder.com/150x150?text=Image+Not+Found";
                              }
                            }}
                          />
                          {/* Add a small indicator showing the image source */}
                          <div className="position-absolute top-0 end-0 m-1">
                            <span className={`badge ${imagePreviews[index] ? 'bg-success' : 'bg-info'}`}>
                              {imagePreviews[index] ? 'New' : 'API'}
                            </span>
                          </div>
                        </div>
                        {/* Show the image URL for debugging */}
                        <div className="mt-1">
                          <small className="text-muted">
                            URL: {imagePreviews[index] ? 'Local file' : (item.image || 'No image')}
                          </small>
                        </div>
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
        <Button onClick={handleSave} disabled={loading || carouselItems.length === 0}>
          {loading ? (
            <>
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              {" Saving..."}
            </>
          ) : (
            "Save"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CarouselEdit;