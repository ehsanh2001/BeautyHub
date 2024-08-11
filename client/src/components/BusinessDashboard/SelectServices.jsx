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

const SelectServices = ({ services, formData, setFormData }) => {
  const [service, setService] = useState("");
  const [price, setPrice] = useState(0);

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
    const found = formData.services.find(
      (selServ) => selServ.serviceName === service
    );
    if (found || !service || !price) {
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      services: [
        ...prevData.services,
        { serviceName: service, price: Number(price) },
      ],
    }));
    setService("");
    setPrice("");
  };

  const handleRemove = (index) => {
    setFormData((prevData) => {
      const newServices = [...prevData.services];
      newServices.splice(index, 1);
      return {
        ...prevData,
        services: newServices,
      };
    });
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
      {/* Selected Services */}
      <Row>
        <Col>
          <ListGroup className="mt-1">
            {formData.services.map((service, index) => (
              <ListGroup.Item
                className="d-flex justify-content-between align-items-center"
                key={index}
              >
                {service.serviceName} ${service.price}
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
