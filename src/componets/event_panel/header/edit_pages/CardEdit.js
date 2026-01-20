import React, { useState, useEffect } from "react";
import { Card, Button, Spinner, Alert, Form, Modal } from "react-bootstrap";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import Wysiwyg from "react-simple-wysiwyg";

const CardEdit = ({ pageId, onEdit, show, onHide }) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [cardImages, setCardImages] = useState({});
  const { token } = useAuth();

  // Fetch cards when component mounts or pageId changes
  useEffect(() => {
    if (show && pageId) {
      fetchCards();
    }
  }, [show, pageId]);

  const fetchCards = async () => {
    try {
      setFetching(true);
      const res = await axios.get(
        "https://mahadevaaya.com/eventmanagement/eventmanagement_backend/api/cards-item/"
        // Removed Authorization header for GET request
      );

      if (res.data.success) {
        // Filter cards by pageId - handle both page_title and page field
        const filtered = res.data.data.filter(
          (card) => {
            // Check if pageId matches page_title
            if (card.page_title === pageId) return true;
            // Check if pageId matches the page field (convert both to strings for comparison)
            if (String(card.page) === String(pageId)) return true;
            return false;
          }
        );
        setCards(filtered);
      }
    } catch (err) {
      console.error("Error fetching cards:", err);
      setError("Failed to load cards");
    } finally {
      setFetching(false);
    }
  };

  const addCard = () => setCards([...cards, { page: pageId, title: "", description: "", image: null, page_title: pageId }]);

  const updateCard = (i, field, value) => {
    const copy = [...cards];
    copy[i][field] = value;
    setCards(copy);
  };

  const handleCardImageChange = (index, file) => {
    setCardImages((prev) => ({ ...prev, [index]: file }));
  };

  const removeCard = async (index) => {
    const cardToRemove = cards[index];
    if (cardToRemove.id) {
      try {
        if (!token) {
          setError("Authentication token not found. Please log in again.");
          return;
        }
        await axios.delete(
          `https://mahadevaaya.com/eventmanagement/eventmanagement_backend/api/cards-item/`,
          {
            data: { id: cardToRemove.id },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (err) {
        console.error("Error deleting card:", err);
        setError("Failed to delete card");
        return;
      }
    }
    setCards(cards.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Save each card
      for (const [index, card] of cards.entries()) {
        const formData = new FormData();
        formData.append("page", pageId);
        formData.append("title", card.title);
        formData.append("description", card.description);

        if (cardImages[index]) {
          formData.append("image", cardImages[index]);
        }

        // If card has an ID, update it; otherwise create a new one
        if (card.id) {
          // Add the ID to the form data for the PUT request
          formData.append("id", card.id);
          
          // Check if token exists before making the request
          if (!token) {
            setError("Authentication token not found. Please log in again.");
            setLoading(false);
            return;
          }
          
          await axios.put(
            `https://mahadevaaya.com/eventmanagement/eventmanagement_backend/api/cards-item/`,
            formData,
            // {
            //   headers: {
            //     Authorization: `Bearer ${token}`,
            //     "Content-Type": "multipart/form-data",
            //   },
            // }
          );
        } else {
          // POST request for new cards
          // Check if token exists before making the request
          if (!token) {
            setError("Authentication token not found. Please log in again.");
            setLoading(false);
            return;
          }
          
          await axios.post(
            "https://mahadevaaya.com/eventmanagement/eventmanagement_backend/api/cards-item/",
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

      setSuccess("Cards updated successfully!");
      setTimeout(() => {
        onHide();
        onEdit("cards");
      }, 800);
    } catch (err) {
      console.error("Error saving cards:", err);
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
        <Modal.Title>Edit Cards</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        {fetching ? (
          <Spinner animation="border" className="d-block mx-auto" />
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4>Cards</h4>
              <Button variant="outline-primary" onClick={addCard}>
                <FaPlus /> Add Card
              </Button>
            </div>

            {cards.length === 0 ? (
              <Alert variant="info">No cards found for this page. Click "Add Card" to create one.</Alert>
            ) : (
              cards.map((card, index) => (
                <div key={card.id || index} className="card mb-3">
                  <div className="card-header d-flex justify-content-between">
                    <span>Card {index + 1}</span>
                    <Button size="sm" variant="danger" onClick={() => removeCard(index)}>
                      <FaTrash />
                    </Button>
                  </div>
                  <div className="card-body">
                    <Form.Control
                      className="mb-2"
                      placeholder="Title"
                      value={card.title || ""}
                      onChange={(e) => updateCard(index, "title", e.target.value)}
                    />

                    <Wysiwyg
                      value={card.description || ""}
                      onChange={(e) => updateCard(index, "description", e.target.value)}
                    />

                    <Form.Control
                      type="file"
                      className="mt-3"
                      accept="image/*"
                      onChange={(e) => handleCardImageChange(index, e.target.files[0])}
                    />

                    {card.image && (
                      <div className="mt-3">
                        <small className="text-muted d-block mb-2">Current Image:</small>
                        <img
                          src={getImageUrl(card.image)}
                          alt={card.title || "Card image"}
                          style={{ 
                            width: 120, 
                            height: 120, 
                            objectFit: 'cover',
                            marginTop: 10, 
                            borderRadius: 6,
                            border: '1px solid #ddd'
                          }}
                          onError={(e) => {
                            console.error("Image failed to load:", card.image);
                            // Try alternative path if the first one fails
                            if (!card.image.startsWith('http') && !card.image.startsWith('/')) {
                              e.target.src = `https://mahadevaaya.com/${card.image}`;
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

export default CardEdit;