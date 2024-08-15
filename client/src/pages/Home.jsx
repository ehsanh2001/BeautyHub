import HomeHeader from "../components/HomeHeader";
import BusinessList from "../components/BusinessList";
import { useLocation } from "react-router-dom";

const Home = () => {
  const { state } = useLocation();
  const type = state?.type || "all";

  return (
    <main className="container-fluid">
      <div className="flex-row justify-center">
        <HomeHeader />
        <BusinessList businessType={type} />
      </div>
    </main>
  );
};

export default Home;
