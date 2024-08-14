import BusinessListItem from "../BusinessListItem";
import {
  GET_ALL_BUSINESSES,
  GET_BUSINESSES_BY_TYPE,
} from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";

const BusinessList = ({ businessType }) => {
  const { loading, error, data, refetch } = useQuery(GET_BUSINESSES_BY_TYPE, {
    variables: { businessType: businessType },
  });

  useEffect(() => {
    refetch(); // Refetch the data when the component mounts
  }, [refetch]);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {data.businessesByType.map((business) => (
            <BusinessListItem key={business.id} business={business} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BusinessList;
