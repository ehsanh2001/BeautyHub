import React, { useState, useCallback, useEffect } from "react";
import {
  Form,
  Row,
  Col,
  Button,
  Tabs,
  Tab,
  Nav,
  Container,
} from "react-bootstrap";
import GoogleMapModal from "./GoogleMapModal";
import SelectServices from "./SelectServices";
import StaffList from "./StaffList";
import ScheduleTable from "./ScheduleTable.jsx";
import formDataInit from "./formDataInit.js";
import { ADD_BUSINESS } from "../../utils/mutations.js";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_BUSINESSE_BY_ID } from "../../utils/queries.js";
import "./BusinessDashboard.css";

const BusinessDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(formDataInit);
  const [addBusiness] = useMutation(ADD_BUSINESS);
  const { userId } = useParams();
  const { loading, data, refetch } = useQuery(GET_BUSINESSE_BY_ID, {
    variables: { userId: userId },
  });
  const [key, setKey] = useState("general");

  // get data from server
  useEffect(() => {
    if (data && data.business) {
      for (let day in formDataInit.openingHours) {
        for (let i = 0; i < data.business.openingHours[day].length; i++) {
          formDataInit.openingHours[day][i] =
            data.business.openingHours[day][i];
        }
      }
      const staff = data.business.staff.map((staff) => {
        return {
          name: staff.name,
          password: "",
        };
      });

      const services = data.business.services.map((service) => {
        return {
          serviceName: service.serviceName,
          price: service.price,
        };
      });

      const businessData = data.business;
      setFormData((prevData) => ({
        ...prevData,
        businessName: businessData.businessName,
        phone: businessData.phone,
        address: businessData.address,
        location: {
          type: "Point",
          coordinates: businessData.location.coordinates,
        },
        businessType: businessData.businessType,
        services: services,
        staff: staff,
        openingHours: formDataInit.openingHours,
      }));
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleOpenModal = useCallback(() => setShowModal(true), []);
  const handleCloseModal = useCallback(() => setShowModal(false), []);

  const handleImageChange = useCallback((e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  }, []);

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
      try {
        // Upload image if new image added or image not exist
        let imageResult = null;
        if (formData.image) {
          const formDataFile = new FormData();
          formDataFile.append("file", formData.image);

          const response = await fetch("/api/upload", {
            method: "POST",
            body: formDataFile,
          });
          imageResult = await response.json();
        }

        // Get image file name
        let imageFileName = imageResult ? imageResult.file.filename : "0";
        if (imageFileName === "0" && data && data.business) {
          imageFileName = data.business.imageFileName;
        }
        // Add business data
        const result = await addBusiness({
          variables: {
            owner: userId,
            businessName: formData.businessName,
            businessType: formData.businessType,
            services: formData.services,
            address: formData.address,
            phone: formData.phone,
            location: formData.location,
            staff: formData.staff,
            openingHours: formData.openingHours,
            imageFileName: imageFileName,
          },
        });
        alert("Business data added successfully");
      } catch (error) {
        alert("Error adding business data");
        console.error("Error adding business data:", error);
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
    <Container fluid>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col sm={3}>
            <Nav
              variant="pills"
              className="flex-column tab-column"
              activeKey={key}
              onSelect={(k) => setKey(k)}
            >
              <Nav.Item>
                <Nav.Link eventKey="general">General</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="services">Services</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="staff">Staff</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="hours">Hours</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content className="tab-pane">
              <Tab.Pane eventKey="general" active={key === "general"}>
                {/* Business Name */}
                <Form.Group
                  as={Row}
                  className="mb-0"
                  controlId="formBusinessName"
                >
                  <Form.Label className="mb-5" column sm={12}>
                    <h4> Business Information </h4>
                  </Form.Label>
                  <Form.Label column sm={2}>
                    <h6> Business Name:</h6>
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
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formBusinessImage"
                >
                  <Form.Label column sm={2}>
                    <h6>Image:</h6>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="file"
                      placeholder="file"
                      onChange={handleImageChange}
                    />
                  </Col>
                </Form.Group>
                {/* Business Phone */}
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formBusinessPhone"
                >
                  <Form.Label column sm={2}>
                    <h6>Business Phone</h6>
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
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formBusinessAddress"
                >
                  <Form.Label column sm={2}>
                    <h6>Business Address:</h6>
                  </Form.Label>
                  <Col sm={9}>
                    <Button variant="outline-dark" onClick={handleOpenModal}>
                      Select Location
                    </Button>
                    {formData.address && (
                      <span className="mt-4 ml-1 p-2">
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
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formBusinessType"
                >
                  <Form.Label column sm={2}>
                    <h6>Business Type:</h6>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Select
                      aria-label="Business Type"
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleFormDataChange}
                    >
                      <option key={123456}>Select Business Type</option>
                      {businessTypes.map((type, index) => (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Form.Group>
              </Tab.Pane>
              <Tab.Pane eventKey="services" active={key === "services"}>
                {/* Business Services */}
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formBusinessServices"
                >
                  <Form.Label className="mb-5" column sm={12}>
                    <h4>Business Services:</h4>
                  </Form.Label>
                  <Col sm={9}>
                    <SelectServices
                      services={businessServices}
                      formData={formData}
                      setFormData={setFormData}
                      className="basic-single"
                      classNamePrefix="select"
                    />
                  </Col>
                </Form.Group>
              </Tab.Pane>
              <Tab.Pane eventKey="staff" active={key === "staff"}>
                {/* Staff List */}
                <Form.Group as={Row} controlId="formStaffList">
                  <Form.Label className="mb-5" column sm={12}>
                    <h4>Staff List</h4>
                  </Form.Label>
                  <Col sm={9}>
                    <StaffList formData={formData} setFormData={setFormData} />
                  </Col>
                </Form.Group>
              </Tab.Pane>
              <Tab.Pane eventKey="hours" active={key === "hours"}>
                {/* Schedule Table */}
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formScheduleTable"
                >
                  <Form.Label className="mb-5" column sm={12}>
                    <h4> Working Hours </h4>
                  </Form.Label>
                  <Col sm={9}>
                    <ScheduleTable
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </Col>
                </Form.Group>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
        {/* Submit Button */}
        <Row className="mt-4">
          <Col sm={{ span: 9, offset: 3 }}>
            <Button size="lg" variant="outline-dark" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default BusinessDashboard;
