
import { React, useState } from "react";
import { Link } from "react-router-dom"; // Ensure you have react-router-dom installed
import { Button, Form, Stack, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Toolbar.css"; // Custom CSS file
import Auth from "../../utils/auth";
import LoginForm from "../LoginForm";

const Toolbar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const handleShowLoginModal = () => setShowLoginModal(true);
  const handleCloseLoginModal = () => setShowLoginModal(false);
  return (
    <nav className="toolbar px-5 ms-4 ">
      <Link to="/" className="navbar-brand">
        BeautyHub
      </Link>
      <div className="d-flex hero">
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/me">
                {/* Run the getProfile() method to get access to the unencrypted token value in order to retrieve the user's username  */}
                {Auth.getProfile().authenticatedPerson.username}'s profile
              </Link>
              <button
                className="btn btn-lg btn-light m-2"
                onClick={Auth.logout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Button className="nav-link" onClick={handleShowLoginModal}>
                Login
              </Button>
              <Link to="/signup" className=" btn nav-link">
                Signup
              </Link>
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
            </>
          )}
      </div>
      <div className=" rounded">
        <Modal show={showLoginModal} onHide={handleCloseLoginModal}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <LoginForm /> {/* Your LoginForm component */}
          </Modal.Body>
        </Modal>
      </div>
    </nav>
  );
};

export default Toolbar;
