import HomeHeader from "../components/HomeHeader";
import BusinessList from "../components/BusinessList";

const Home = () => {
  return (
    <main>
      <h1>Home page</h1>
      <div className="flex-row justify-center">
        <HomeHeader />
        <BusinessList businessType="all" />
      </div>
    </main>
  );
};

export default Home;
