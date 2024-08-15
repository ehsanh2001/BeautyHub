import Header from "../components/Header";
import Business from "../components/Business";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Auth from "../utils/auth";

const BusinessDetails = () => {
  const { state } = useLocation();
  const business = state.business;

  return (
    <main className="flex-row justify-center mb-4">
      <Header />
      <Business business={business} />
    </main>
  );
};

export default BusinessDetails;
