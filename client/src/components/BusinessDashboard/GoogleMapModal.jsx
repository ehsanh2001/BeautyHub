import React, { useState, useRef, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const GoogleMapModal = ({ show, handleClose, setLocation }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [address, setAddress] = useState("");
  const [latLng, setLatLng] = useState({ lat: null, lng: null });

  useEffect(() => {
    if (show) {
      const initMap = (userLocation) => {
        const mapInstance = new window.google.maps.Map(mapRef.current, {
          zoom: 10,
          center: userLocation,
        });

        // Add double-click listener to the map
        mapInstance.addListener("dblclick", (event) => {
          const clickedLocation = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
          };

          // Remove any existing markers
          if (marker) {
            marker.setMap(null);
          }

          // Create a new marker
          const newMarker = new window.google.maps.Marker({
            position: clickedLocation,
            map: mapInstance,
          });

          setMarker(newMarker);
          setLatLng(clickedLocation);

          // Reverse Geocode to get the address
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ location: clickedLocation }, (results, status) => {
            if (status === "OK" && results[0]) {
              setAddress(results[0].formatted_address);
            } else {
              setAddress("Address not found");
            }
          });
        });

        setMap(mapInstance);
      };

      // Fetch user's location based on IP address
      const fetchUserLocation = async () => {
        try {
          const response = await fetch("https://ipapi.co/json/");
          const data = await response.json();
          const userLocation = {
            lat: data.latitude,
            lng: data.longitude,
          };
          initMap(userLocation);
        } catch (error) {
          console.error("Failed to fetch user location:", error);
          const defaultLocation = { lat: 40.7128, lng: -74.006 }; // Default to New York City
          initMap(defaultLocation);
        }
      };

      fetchUserLocation();
    }

    return () => {
      // Clean up the map and marker when modal is closed
      if (map) {
        window.google.maps.event.clearInstanceListeners(map);
      }
      if (marker) {
        marker.setMap(null);
      }
      setMap(null);
      setMarker(null);
      setAddress("");
      setLatLng({ lat: null, lng: null });
    };
  }, [show]);

  const handleSave = () => {
    if (latLng.lat && latLng.lng && address) {
      setLocation({ address, lat: latLng.lat, lng: latLng.lng });
    }
    handleClose();
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          // Center map on the current location
          map.setCenter(currentLocation);
          map.setZoom(15);
          // Remove any existing markers
          if (marker) {
            marker.setMap(null);
          }

          // Create a new marker at the current location
          const newMarker = new window.google.maps.Marker({
            position: currentLocation,
            map: map,
          });

          setMarker(newMarker);
          setLatLng(currentLocation);

          // Reverse Geocode to get the address
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ location: currentLocation }, (results, status) => {
            if (status === "OK" && results[0]) {
              setAddress(results[0].formatted_address);
            } else {
              setAddress("Address not found");
            }
          });
        },
        (error) => {
          console.error("Error retrieving current location:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Select Location on Map</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div ref={mapRef} style={{ height: "400px", width: "100%" }}></div>
        <Button
          variant="outline-dark"
          onClick={handleCurrentLocation}
          className="mt-3"
        >
          Find My Current Location
        </Button>
        <div className="mt-3">
          <p>
            <strong>Address:</strong> {address}
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Location
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GoogleMapModal;
