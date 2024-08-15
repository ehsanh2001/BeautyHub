import { useLocation, useNavigate } from "react-router-dom";
const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="w-100 mt-auto p-4 footer">
      <div className="container text-center mb-5">
        {location.pathname !== "/" && (
          <button
            className="btn btn-dark mb-3"
            onClick={() => window.location.replace("/")}
          >
            &larr; Go Back
          </button>
        )}
        <h5>2024 Coding Bootcamp UofT SCS</h5>
      </div>
    </footer>
  );
};

export default Footer;
