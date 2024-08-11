import React from "react";
import { useState } from "react";
import { Form, Row, Col, Button, Dropdown } from "react-bootstrap";
import SelectServices from "./SelectServices";
import GoogleMapModal from "./GoogleMapModal";
import StaffList from "./StaffList";

const BusinessDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSetLocation = (location) => {
    setSelectedLocation(location);
  };

  const businessServices = ["Haircut", "Shave", "Manicure", "Pedicure"];
  const businessTypes = [
    "Barbershop",
    "Hair Salon",
    "Nail Salon",
    "Skin Care",
    "Spa",
  ];

  return (
    <Form>
      {/* Business Name */}
      <Form.Group as={Row} className="mb-3" controlId="formBusinessName">
        <Form.Label column sm={2}>
          Business Name
        </Form.Label>
        <Col sm={9}>
          <Form.Control type="text" placeholder="Name" />
        </Col>
      </Form.Group>
      {/* Business Image */}
      <Form.Group as={Row} className="mb-3" controlId="formBusinessImage">
        <Form.Label column sm={2}>
          Image:
        </Form.Label>
        <Col sm={9}>
          <Form.Control type="file" placeholder="file" />
        </Col>
      </Form.Group>
      {/* Business Phone */}
      <Form.Group as={Row} className="mb-3" controlId="formBusinessPhone">
        <Form.Label column sm={2}>
          Business Phone
        </Form.Label>
        <Col sm={9}>
          <Form.Control type="text" placeholder="Phone" />
        </Col>
      </Form.Group>

      {/* Business Address */}
      <Form.Group as={Row} className="mb-3" controlId="formBusinessAddress">
        <Form.Label column sm={2}>
          Business Address
        </Form.Label>
        <Col sm={9}>
          <Button variant="success" onClick={handleOpenModal}>
            Select Location
          </Button>
          {selectedLocation && (
            <span className="mt-4 ml-1">
              <strong>Address:</strong> {selectedLocation.address}
            </span>
          )}
          <GoogleMapModal
            show={showModal}
            handleClose={handleCloseModal}
            setLocation={handleSetLocation}
          />
        </Col>
      </Form.Group>
      {/* Business Type */}
      <Form.Group as={Row} className="mb-3" controlId="formBusinessType">
        <Form.Label column sm={2}>
          Business Type
        </Form.Label>
        <Col sm={9}>
          <Form.Select aria-label="Default select example">
            {businessTypes.map((type, index) => (
              <option key={index}>{type}</option>
            ))}
          </Form.Select>
        </Col>
      </Form.Group>

      {/* Business Services */}
      <Form.Group as={Row} className="mb-3" controlId="formBusinessServices">
        <Form.Label column sm={2}>
          Business Services
        </Form.Label>
        <Col sm={9}>
          <SelectServices services={businessServices} />
        </Col>
      </Form.Group>

      {/* Staff List */}
      <Form.Group as={Row} className="mb-3" controlId="formStaffList">
        <Form.Label column sm={2}>
          Staff List
        </Form.Label>
        <Col sm={9}>
          <StaffList />
        </Col>
      </Form.Group>
      {/* Submit Button */}
      <Button size="lg" variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default BusinessDashboard;
