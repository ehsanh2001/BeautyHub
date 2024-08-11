import HomeHeader from "../components/HomeHeader";
import BusinessList from "../components/BusinessList";

const Home = () => {
  return (
    <main className="container-fluid">
      <div className="flex-row justify-center">
        <HomeHeader />
        <BusinessList businessType="all" />
      </div>
    </main>
  );
};

export default Home;
