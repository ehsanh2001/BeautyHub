import React, { useState, useCallback } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import GoogleMapModal from "./GoogleMapModal";
import SelectServices from "./SelectServices";
import StaffList from "./StaffList";
import formDataInit from "./formDataInit.js";
import { ADD_BUSINESS } from "../../utils/mutations.js";
import { useMutation } from "@apollo/client";

const BusinessDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(formDataInit);
  const [addBusiness] = useMutation(ADD_BUSINESS);

  const handleOpenModal = useCallback(() => setShowModal(true), []);
  const handleCloseModal = useCallback(() => setShowModal(false), []);

  const handleSetLocation = useCallback((location) => {
    setFormData((prevData) => ({
      ...prevData,
      address: location.address,
      location: {
        type: "Point",
        coordinates: [location.lng, location.lat],
      },
    }));
  }, []);

  const handleFormDataChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      console.log(formData);
      const result = await addBusiness({
        variables: {
          businessName: formData.businessName,
          businessType: formData.businessType,
          services: formData.services,
          address: formData.address,
          phone: formData.phone,
          location: formData.location,
          staff: formData.staff,
        },
      });
      if (!result.errors) {
        alert("Business added successfully");
      } else {
        alert("Error adding business");
      }
    },
    [formData]
  );

  const businessTypes = [
    "Barbershop",
    "Hair Salon",
    "Nail Salon",
    "Skin Care",
    "Spa",
  ];

  const businessServices = [
    "Haircut",
    "Hair Color",
    "Hair Styling",
    "Hair Treatment",
    "Hair Extension",
    "Hair Removal",
    "Nail Care",
    "Skin Care",
  ];

  return (
    <Form onSubmit={handleSubmit}>
      {/* Business Name */}
      <Form.Group as={Row} className="mb-3" controlId="formBusinessName">
        <Form.Label column sm={2}>
          Business Name
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="text"
            name="businessName"
            placeholder="Name"
            value={formData.businessName}
            onChange={handleFormDataChange}
          />
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
          <Form.Control
            type="text"
            placeholder="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleFormDataChange}
          />
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
          {formData.address && (
            <span className="mt-4 ml-1">
              <strong>Address:</strong> {formData.address}
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
          <Form.Select
            aria-label="Business Type"
            name="businessType"
            value={formData.businessType}
            onChange={handleFormDataChange}
          >
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
          <SelectServices
            services={businessServices}
            formData={formData}
            setFormData={setFormData}
          />
        </Col>
      </Form.Group>
      {/* Staff List */}
      <Form.Group as={Row} className="mb-3" controlId="formStaffList">
        <Form.Label column sm={2}>
          Staff List
        </Form.Label>
        <Col sm={9}>
          <StaffList formData={formData} setFormData={setFormData} />
        </Col>
      </Form.Group>{" "}
      {/* Submit Button */}
      <Button size="lg" variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default BusinessDashboard;
