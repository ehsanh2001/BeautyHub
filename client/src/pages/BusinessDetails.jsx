import Header from "../components/Header";
import Business from "../components/Business";
import { useParams } from "react-router-dom";

import Auth from "../utils/auth";

const BusinessDetails = () => {
  const { id } = useParams();
  // get the business data from the API
  const businessData = {
    name: "Business Name",
    address: "Business address",
    phone: "Business phone",
  };
  //
  return (
    <main className="flex-row justify-center mb-4">
      <h1>Business Details page</h1>
      <Header />
      <Business business={businessData} />
    </main>
  );
};

export default BusinessDetails;
