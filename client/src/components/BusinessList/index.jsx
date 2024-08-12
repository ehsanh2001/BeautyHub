import BusinessListItem from "../BusinessListItem";
import { GET_ALL_BUSINESSES } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";

const BusinessList = ({ businessType }) => {
  const { loading, error, data, refetch } = useQuery(GET_ALL_BUSINESSES);

  useEffect(() => {
    refetch(); // Refetch the data when the component mounts
  }, [refetch]);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {data.businesses.map((business) => (
            <BusinessListItem key={business.id} business={business} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BusinessList;
