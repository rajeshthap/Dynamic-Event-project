import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Card, Alert, Spinner } from "react-bootstrap";
import { FaPlus, FaTrash, FaGripVertical } from "react-icons/fa";
import Wysiwyg from "react-simple-wysiwyg";
import axios from "axios";

const EditModal = ({ show, onHide, pageId, initialTitle, initialData, onSave }) => {
  const [pageTitle, setPageTitle] = useState(initialTitle || "");
  const [contentType] = useState("cards");
  const [cards, setCards] = useState([]);
  const [cardImages, setCardImages] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (show && pageId) {
      fetchCards();
      setPageTitle(initialTitle || "");
      setError("");
      setSuccess("");
    }
  }, [show, pageId]);

  const fetchCards = async () => {
    try {
      setFetching(true);
      const res = await axios.get(
        "https://mahadevaaya.com/eventmanagement/eventmanagement_backend/api/cards-item/"
      );

      if (res.data.success) {
        const filtered = res.data.data
          .filter((c) => c.page === parseInt(pageId, 10))
          .map((c) => ({
            id: c.id,
            title: c.title,
            content: c.description,
            image: c.image,
          }));

        setCards(filtered);
      }
    } catch {
      setError("Failed to load cards");
    } finally {
      setFetching(false);
    }
  };

  const addCard = () => setCards([...cards, { title: "", content: "", image: null }]);

  const updateCard = (i, field, value) => {
    const copy = [...cards];
    copy[i][field] = value;
    setCards(copy);
  };

  const handleImageChange = (index, file) => {
    setCardImages((prev) => ({ ...prev, [index]: file }));
  };

  const removeCard = (index) => setCards(cards.filter((_, i) => i !== index));

  const handleSave = async () => {
    setLoading(true);
    setError("");

    try {
      for (const [index, card] of cards.entries()) {
        const formData = new FormData();
        formData.append("page", pageId);
        formData.append("title", card.title);
        formData.append("description", card.content);

        if (cardImages[index]) {
          formData.append("image", cardImages[index]);
        }

        if (card.id) {
          formData.append("id", card.id);
          await axios.put(
            "https://mahadevaaya.com/eventmanagement/eventmanagement_backend/api/cards-item/",
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
          );
        } else {
          await axios.post(
            "https://mahadevaaya.com/eventmanagement/eventmanagement_backend/api/cards-item/",
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
          );
        }
      }

      setSuccess("Cards updated successfully!");
      setTimeout(() => {
        onSave();
        onHide();
      }, 800);
    } catch (err) {
      setError("Save failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Edit Cards</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Button variant="outline-primary" className="mb-3" onClick={addCard}>
          <FaPlus /> Add Card
        </Button>

        {fetching ? (
          <Spinner animation="border" />
        ) : (
          cards.map((card, index) => (
            <Card key={index} className="mb-3">
              <Card.Header className="d-flex justify-content-between">
                <span><FaGripVertical /> Card {index + 1}</span>
                <Button size="sm" variant="danger" onClick={() => removeCard(index)}>
                  <FaTrash />
                </Button>
              </Card.Header>

              <Card.Body>
                <Form.Control
                  className="mb-2"
                  placeholder="Title"
                  value={card.title}
                  onChange={(e) => updateCard(index, "title", e.target.value)}
                />

                <Wysiwyg
                  value={card.content}
                  onChange={(e) => updateCard(index, "content", e.target.value)}
                />

                <Form.Control
                  type="file"
                  className="mt-3"
                  accept="image/*"
                  onChange={(e) => handleImageChange(index, e.target.files[0])}
                />

                {card.image && (
                  <img
                    src={card.image}
                    alt=""
                    style={{ width: 120, marginTop: 10, borderRadius: 6 }}
                  />
                )}
              </Card.Body>
            </Card>
          ))
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

export default EditModal;
