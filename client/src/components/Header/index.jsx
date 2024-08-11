import Toolbar from "../Toolbar";
import BusinessTypeNav from "../BusinessTypeNav";

const Header = () => {
  return (
    <header className="bg-primary text-light mb-4 py-3 flex-row align-center">
      <Toolbar />
      <BusinessTypeNav />
    </header>
  );
};

export default Header;
