import React, { useState } from "react";
import { Form, Button, Container, Row, Col, ListGroup } from "react-bootstrap";

const StaffList = ({ formData, setFormData }) => {
  const [staff, setStaff] = useState("");
  const [staffPassword, setStaffPassword] = useState("");
  const [retypeStaffPassword, setRetypeStaffPassword] = useState("");
  const [validatedPassword, setValidatedPassword] = useState(true);

  const handleSelect = (eventKey) => {
    setStaff(eventKey);
  };

  const handleStaffChange = (e) => {
    setStaff(e.target.value);
  };

  const handleStaffPasswordChange = (e) => {
    setStaffPassword(e.target.value);
  };

  const handleRetypeStaffPasswordChange = (e) => {
    setValidatedPassword(true);
    setRetypeStaffPassword(e.target.value);
  };

  const handleAdd = () => {
    const found = formData.staff.find((selStaff) => selStaff.name === staff);
    if (found || !staff) {
      return;
    }
    if (staffPassword.length == 0) return;
    if (staffPassword !== retypeStaffPassword) {
      setValidatedPassword(false);

      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      staff: [...prevData.staff, { name: staff, password: staffPassword }],
    }));

    setStaff("");
    setStaffPassword("");
    setRetypeStaffPassword("");
  };

  const handleRemove = (index) => {
    setFormData((prevData) => {
      const newStaff = [...prevData.staff];
      newStaff.splice(index, 1);
      return {
        ...prevData,
        staff: newStaff,
      };
    });
  };

  return (
    <Container>
      <Row>
        {/* Name */}
        <Col xs={3}>
          <Form.Control
            type="text"
            placeholder="Staff Name"
            value={staff}
            onChange={handleStaffChange}
          />
        </Col>
        {/* Password */}
        <Col xs={3}>
          <Form.Control
            type="password"
            placeholder="Password"
            value={staffPassword}
            onChange={handleStaffPasswordChange}
          />
        </Col>
        {/* Retype Password */}
        <Col xs={3}>
          <Form.Group controlId="formStaffRetypePassword">
            <Form.Control
              type="password"
              placeholder="Retype Password"
              value={retypeStaffPassword}
              onChange={handleRetypeStaffPasswordChange}
              isInvalid={!validatedPassword}
            />
            <Form.Control.Feedback type="invalid">
              Passwords do not match
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        {/* Add Button */}
        <Col xs={1}>
          <Button variant="outline-dark" onClick={handleAdd}>
            Add
          </Button>
        </Col>
      </Row>
      {/* Staff List */}
      <Row>
        <Col>
          <ListGroup className="mt-2">
            {formData.staff.map((selStaff, index) => (
              <ListGroup.Item
                className="d-flex justify-content-between align-items-center"
                key={`staff-${index}`}
              >
                {selStaff.name}
                <Button
                className="btn-close"
                  size="sm"
                  variant="outline-dark"
                  onClick={() => handleRemove(index)}
                >
                  
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default StaffList;
