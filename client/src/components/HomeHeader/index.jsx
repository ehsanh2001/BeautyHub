import Toolbar from "../Toolbar";
import BusinessTypeNav from "../BusinessTypeNav";
import { Button, Form, Stack, Modal} from "react-bootstrap";
import HomeSearch from "../HomeSearch";
import "./HomeHeader.css";
import { React, useState } from "react";
import { useNavigate } from "react-router-dom"; 

const HomeHeader = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate(); 
  
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery.trim()}`); // Navigate to the search endpoint
    }
  };
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
        <Form className="d-flex justify-content-center m-4 " onSubmit={handleSearchSubmit}>
          <Form.Control
            type="search"
            placeholder="Search Services or Business"
            className="me-3 small-search-bar"
            aria-label="Search"
            value={searchQuery} // Controlled input value
            onChange={handleSearchChange} // Update state on input change
          />
          
          <Button className="btn-light" type="submit">
            Search
          </Button>
          
        </Form>
      </div>
      <HomeSearch />
      <div className="home-navbar ">
        <BusinessTypeNav types={["All", "Barbershop", "Hair Salon"]} />
      </div>
    </header>
  );
};

export default HomeHeader;
