import { Link } from "react-router-dom";

const BusinessTypeNav = () => {
  return (
    <div>
      <nav>
        <h1>BusinessTypeNav Component</h1>
        <ul className="flex-row">
          <li className="mx-2">
            <Link to="/search/Hair%20Salon">Hair Salon</Link>
          </li>
          <li className="mx-2">
            <Link to="/search/Barbershop">Barbershop</Link>
          </li>
          <li className="mx-2">
            <Link to="/search/Skin%20Care">Skin Care</Link>
          </li>
          <li className="mx-2">
            <Link to="/search/Nail%20Services">Nail Services</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default BusinessTypeNav;
