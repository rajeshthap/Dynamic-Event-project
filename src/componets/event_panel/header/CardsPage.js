import React from "react";
import { Row, Col, Card } from "react-bootstrap";

const CardsPage = ({ cards }) => {
  if (!cards || cards.length === 0) {
    return <p className="text-muted">No cards to display</p>;
  }

  return (
    <Row className="g-3">
      {cards.map((card) => (
        <Col md={4} key={card.id}>
          <Card className="h-100 shadow-sm">
            {/* Show Image if exists */}
            {card.image && (
              <Card.Img
                variant="top"
                src={card.image}
                style={{
                  height: "180px",
                  objectFit: "cover",
                }}
              />
            )}

            <Card.Body className="new-class">
              <Card.Title>{card.title}</Card.Title>

              {card.description && (
                <Card.Text
                  dangerouslySetInnerHTML={{
                    __html: card.description,
                  }}
                />
              )}
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default CardsPage;
