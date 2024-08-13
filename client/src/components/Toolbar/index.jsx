import { React, useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
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
            <Link
              className="btn nav-link m-2"
              to={`/dashboard/${Auth.getProfile().authenticatedPerson._id}`}
            >
              {/* Run the getProfile() method to get access to the unencrypted token value in order to retrieve the user's username  */}
              {Auth.getProfile().authenticatedPerson.username}'s Dashboard
            </Link>
            <button className="btn nav-link m-2" onClick={Auth.logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="btn nav-link" onClick={handleShowLoginModal}>
              Login
            </Link>
            <Link to="/signup" className=" btn nav-link">
              Signup
            </Link>
            {/* <Link to="/dashboard" className="btn nav-link">
              Dashboard
            </Link> */}
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
