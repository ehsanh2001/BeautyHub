import { Link } from "react-router-dom";

const BusinessListItem = ({ business }) => {
  return (
    <div>
      <h1>BusinessListItem Component</h1>
      <p>{business.businessName}</p>
      <p>Business Type: {business.businessType}</p>
      {<Link to="/business_details/1">Details...</Link>}
    </div>
  );
};

export default BusinessListItem;
