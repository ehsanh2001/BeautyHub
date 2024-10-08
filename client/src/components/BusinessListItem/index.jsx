import React from "react";
import { Card, ListGroup, Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const BusinessListItem = ({ business }) => {
  const imageSrc = `/api/image/${business.imageFileName}`;
  return (
    <Card
      className="my-4"
      style={{
        width: "100%",
        height: "auto",
        margin: "10px",
      }}
    >
      <Row>
        <Col md={4}>
          <Card.Img
            variant="top"
            src={imageSrc}
            style={{ height: "30vh", objectFit: "cover" }}
          />
        </Col>
        <Col md={8}>
          <Card.Body>
            <Card.Title>
              <Link
                to={`/business_details/${business.id}`}
                state={{ business: business }}
              >
                {business.businessName}
              </Link>
            </Card.Title>
            <Card.Text>({business.businessType})</Card.Text>
            <Card.Text>{business.address}</Card.Text>
            <ListGroup variant="flush">
              {business.services.slice(0, 3).map((service, index) => (
                <ListGroup.Item
                  key={index}
                  className="d-flex justify-content-between align-items-center"
                >
                  <span>{service.serviceName}</span>
                  <span>
                    ${service.price}{" "}
                    {/* Show the button when the booking functioanluty is added */}
                    {/* <Button variant="primary" size="sm">
                      Book
                    </Button> */}
                  </span>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default BusinessListItem;
