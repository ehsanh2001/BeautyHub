import Toolbar from "../Toolbar";
import BusinessTypeNav from "../BusinessTypeNav";
import HomeSearch from "../HomeSearch";
import "./HomeHeader.css";

const HomeHeader = () => {
  return (
    <header className="video-background">
      <video autoPlay muted loop>
        <source src="./videos/horizontal_.webm" type="video/webm" />
        Your browser does not support HTML5 video.
      </video>
      <div className="overlay"> {/* Dark overlay */}
      <Toolbar />
      </div>
      <div className="middle-text">
        Discover and book beauty & wellness professionals near you
      </div>
      <HomeSearch />
      <div className="home-navbar ">
        <BusinessTypeNav types={["All", "Barbershop", "Hair Salon"]} />
      </div>
    </header>
  );
};

export default HomeHeader;
