import React, { useState, useCallback, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import GoogleMapModal from "./GoogleMapModal";
import SelectServices from "./SelectServices";
import StaffList from "./StaffList";
import ScheduleTable from "./ScheduleTable.jsx";
import formDataInit from "./formDataInit.js";
import { ADD_BUSINESS } from "../../utils/mutations.js";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_BUSINESSE_BY_ID } from "../../utils/queries.js";


const BusinessDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(formDataInit);
  const [addBusiness] = useMutation(ADD_BUSINESS);
  const { userId } = useParams();
  const { loading, data } = useQuery(GET_BUSINESSE_BY_ID, {
    variables: { userId: userId },
  });

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

          const response = await fetch("http://localhost:3001/upload", {
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
    <Form  className="container" onSubmit={handleSubmit}>
      {/* Business Name */}
      <div>
      <Form.Group as={Row} className="mb-3" controlId="formBusinessName">
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
      </div>
      {/* Business Image */}
      <Form.Group as={Row} className="mb-3" controlId="formBusinessImage">
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
      <Form.Group as={Row} className="mb-3" controlId="formBusinessPhone">
        <Form.Label column sm={2}>
        <h6>Business Phone</h6>
        </Form.Label>
        <Col sm={6}>
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
        <h6>Business Address:</h6>
        </Form.Label>
        <Col sm={9}>
          <Button variant="outline-dark" onClick={handleOpenModal}>
            Select Location
          </Button>
          {formData.address && (
            <span className="mt-4 ml-1 p-2">
              <strong >Address:</strong> {formData.address}
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
      {/* Business Services */}
      <Form.Group as={Row} className="mb-3" controlId="formBusinessServices">
        <Form.Label column sm={2}>
          <h6>Business Services:</h6>
        </Form.Label>
        <Col sm={9} >
          <SelectServices
            services={businessServices}
            formData={formData}
            setFormData={setFormData}
            className="basic-single"
            classNamePrefix="select"
          />
        </Col>
      </Form.Group>
      {/* Staff List */}
      <Form.Group as={Row} className="mb-3" controlId="formStaffList">
        <Form.Label column sm={2}>
        <h6>Staff List</h6>
        </Form.Label>
        <Col sm={9}>
          <StaffList formData={formData} setFormData={setFormData} />
        </Col>
      </Form.Group>{" "}
      {/* Schedule Table */}
      <Form.Group as={Row} className="mb-3" controlId="formScheduleTable">
        <Form.Label column sm={2}>
        <h6> Schedule </h6>
        </Form.Label>
        <Col sm={9}>
          <ScheduleTable formData={formData} setFormData={setFormData} />
        </Col>
      </Form.Group>
      {/* Submit Button */}
      <Button size="lg" variant="outline-dark" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default BusinessDashboard;
