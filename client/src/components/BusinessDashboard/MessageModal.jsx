import React from "react";
import { Modal, Button } from "react-bootstrap";

function MessageModal({ show, message, type, onClose }) {
  const getModalStyle = () => {
    return {
      backgroundColor: type === "error" ? "#f8d7da" : "#d4edda",
    };
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton style={getModalStyle()}>
        <Modal.Title>{type === "error" ? "Error" : "Success"}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={getModalStyle()}>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant={type === "error" ? "danger" : "success"}
          onClick={onClose}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MessageModal;
