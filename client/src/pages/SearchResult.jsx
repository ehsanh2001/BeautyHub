import Header from "../components/Header";
import BusinessList from "../components/BusinessList";
import { useParams } from "react-router-dom";

import Auth from "../utils/auth";

const BusinessDetails = () => {
  const { type } = useParams();
  // get the business data from the API
  const businessData = {
    name: "Business Name",
    address: "Business address",
    phone: "Business phone",
  };
  //
  return (
    <main className="flex-row justify-center mb-4">
      <h1>Search page</h1>
      <Header />
      <BusinessList businessType={type} />
    </main>
  );
};

export default BusinessDetails;
