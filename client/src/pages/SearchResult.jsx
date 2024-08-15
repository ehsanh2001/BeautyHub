import Header from "../components/Header";
import BusinessListItem from "../components/BusinessListItem";
import { useParams } from "react-router-dom";
import { SEARCH_BUSINESSES } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";

const SearchResults = () => {
  const { query } = useParams();

  // get the business data from the API
  const { loading, data, refetch } = useQuery(SEARCH_BUSINESSES, {
    variables: { searchTerm: query },
  });

  console.log(data);
  useEffect(() => {
    refetch();
  }, [query, refetch]);

  if (loading) {
    return <div>Loading...</div>;
  }
  const businesses = data?.searchBusinessesBySeriveOrName || [];

  return (
    <main className="flex-row justify-center mb-4">
      <Header />

      <h1>Search results</h1>
      <div>
        {businesses.map((business) => (
          <BusinessListItem key={business.id} business={business} />
        ))}
      </div>
    </main>
  );
};

export default SearchResults;
