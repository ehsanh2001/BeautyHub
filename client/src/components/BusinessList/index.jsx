import BusinessListItem from "../BusinessListItem";

const BusinessList = ({ businessType }) => {
  return (
    <div>
      <h1>BusinessList Component for {businessType}</h1>
      <BusinessListItem
        business={{ businessName: "Business 1", businessType: "Business type" }}
      />
      <BusinessListItem
        business={{ businessName: "Business 2", businessType: "Business type" }}
      />
    </div>
  );
};

export default BusinessList;
