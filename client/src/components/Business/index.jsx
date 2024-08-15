import React from "react";
import { Card, ListGroup, Button, Col, Row } from "react-bootstrap";
import WorkingHoursTable from "./WorkingHoursTable";

const Business = ({ business }) => {
  const imageSrc = `/api/image/${business.imageFileName}`;
  return (
    <Card
      className="my-4"
      style={{
        width: "90%",
        height: "auto",
        marginLeft: "auto",
        marginRight: "auto",
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
            <Card.Title>{business.businessName}</Card.Title>
            <Card.Text>({business.businessType})</Card.Text>
            <Card.Text>
              <strong>Address: </strong>
              {business.address}
            </Card.Text>
            <Card.Text>
              <strong>Phone: </strong>
              {business.phone}
            </Card.Text>
            <Card.Text>
              <strong>Services </strong>
            </Card.Text>
            <ListGroup variant="flush">
              {business.services.map((service, index) => (
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
            <Card.Text>
              <strong>Staff </strong>
            </Card.Text>
            <ListGroup variant="flush">
              {business.staff.map((st, index) => (
                <ListGroup.Item
                  key={`staff-${index}`}
                  className="d-flex justify-content-between align-items-center"
                >
                  <span>{st.name}</span>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Col>
        <Col md={{ span: 8, offset: 2 }}>
          <Card.Text>
            <strong>Openning Hours </strong>
          </Card.Text>
          <WorkingHoursTable weekData={business.openingHours} />
        </Col>
      </Row>
    </Card>
  );
};

export default Business;
