import Toolbar from "../Toolbar";
import BusinessTypeNav from "../BusinessTypeNav";
import { Link } from "react-router-dom";
import "./style.css";

const Header = () => {
  return (
    <header className="bg-dark text-light mb-4 py-3 flex-row align-center">
      <Toolbar />
      <div className = "NavHeader">
      <BusinessTypeNav />
      </div>
    </header>
  );
};

export default Header;
