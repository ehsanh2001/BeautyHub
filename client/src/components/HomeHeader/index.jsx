import Toolbar from "../Toolbar";
import BusinessTypeNav from "../BusinessTypeNav";
import HomeSearch from "../HomeSearch";

const HomeHeader = () => {
  return (
    <header className="bg-primary text-light mb-4 py-3 flex-row align-center">
      <h1>Home Header Component</h1>
      <Toolbar />
      <HomeSearch />
      <BusinessTypeNav />
    </header>
  );
};

export default HomeHeader;
