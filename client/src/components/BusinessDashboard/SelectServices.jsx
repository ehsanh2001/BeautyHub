import React, { useState } from "react";
import {
  Dropdown,
  ButtonGroup,
  Form,
  Button,
  Container,
  Row,
  Col,
  ListGroup,
} from "react-bootstrap";

const SelectServices = ({ services }) => {
  const [service, setService] = useState("");
  const [price, setPrice] = useState(0);
  const [selectedServices, setSelectedServices] = useState([]);

  const handleSelect = (eventKey) => {
    setService(eventKey);
  };

  const handleServiceChange = (e) => {
    setService(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleAdd = () => {
    const found = selectedServices.find(
      (selServ) => selServ.service === service
    );
    if (found || !service || !price) {
      return;
    }
    setSelectedServices([
      ...selectedServices,
      { service: service, price: Number(price) },
    ]);
    setService("");
    setPrice("");
  };

  const handleRemove = (index) => {
    const newServices = [...selectedServices];
    newServices.splice(index, 1);
    setSelectedServices(newServices);
  };

  return (
    <Container>
      <Row>
        <Col xs={3}>
          <Dropdown as={ButtonGroup} onSelect={handleSelect}>
            <Form.Control
              type="text"
              value={service}
              placeholder="service"
              onChange={handleServiceChange}
            />

            <Dropdown.Toggle
              split
              variant="success"
              id="dropdown-split-basic"
            />

            <Dropdown.Menu>
              {services.map((type, index) => (
                <Dropdown.Item key={`service-${index}`} eventKey={type}>
                  {type}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>

        {/* Service Price */}
        <Col>
          <Form.Control
            type="number"
            placeholder="price"
            value={price}
            onChange={handlePriceChange}
          />
        </Col>
        <Col>
          <Button variant="success" onClick={handleAdd}>
            Add
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <ListGroup className="mt-1">
            {selectedServices.map((service, index) => (
              <ListGroup.Item
                className="d-flex justify-content-between align-items-center"
                key={index}
              >
                {service.service} ${service.price}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleRemove(index)}
                >
                  X
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default SelectServices;
