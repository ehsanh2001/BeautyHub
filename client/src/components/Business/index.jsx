const BusinessDetails = ({ business }) => {
  return (
    <div>
      <h1>Business Component</h1>
      <h1>{business.name}</h1>
      <p>{business.address}</p>
      <p>{business.phone}</p>
    </div>
  );
};

export default BusinessDetails;
