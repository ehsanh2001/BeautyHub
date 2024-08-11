import React, { useState } from "react";
import { Form, Button, Container, Row, Col, ListGroup } from "react-bootstrap";

const StaffList = ({}) => {
  const [staff, setStaff] = useState("");
  const [staffPassword, setStaffPassword] = useState("");
  const [retypeStaffPassword, setRetypeStaffPassword] = useState("");
  const [selectedStaff, setSelectedStaff] = useState([]);
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
    const found = selectedStaff.find((selStaff) => selStaff.staff === staff);
    if (found || !staff) {
      return;
    }
    if (staffPassword.length == 0) return;
    if (staffPassword !== retypeStaffPassword) {
      setValidatedPassword(false);

      return;
    }
    setSelectedStaff([
      ...selectedStaff,
      { staff: staff, staffPassword: staffPassword },
    ]);
    setStaff("");
    setStaffPassword("");
    setRetypeStaffPassword("");
  };

  const handleRemove = (index) => {
    const newStaff = [...selectedStaff];
    newStaff.splice(index, 1);
    setSelectedStaff(newStaff);
  };

  return (
    <Container>
      <Row>
        <Col xs={3}>
          <Form.Control
            type="text"
            placeholder="Staff Name"
            value={staff}
            onChange={handleStaffChange}
          />
        </Col>
        <Col xs={3}>
          <Form.Control
            type="password"
            placeholder="Password"
            value={staffPassword}
            onChange={handleStaffPasswordChange}
          />
        </Col>
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
        <Col xs={1}>
          <Button variant="success" onClick={handleAdd}>
            Add
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <ListGroup className="mt-2">
            {selectedStaff.map((selStaff, index) => (
              <ListGroup.Item
                className="d-flex justify-content-between align-items-center"
                key={`staff-${index}`}
              >
                {selStaff.staff}
                <Button
                  size="sm"
                  className="mx-5"
                  variant="danger"
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

export default StaffList;
