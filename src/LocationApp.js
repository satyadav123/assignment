import React, { useState, useEffect } from 'react';
import './Location.css'
const LocationApp = () => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Check if Geolocation is available in the browser
    if ("geolocation" in navigator) {
      // Request permission and fetch location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchUserLocation(latitude, longitude);
        },
        (error) => {
          console.error("Geolocation Error:", error);
        }
      );
    } else {
      console.log("Geolocation is not available in this browser.");
    }
  }, []);

  const fetchUserLocation = async (latitude, longitude) => {
    try {
      const apiUrl = `https://api.example.com/reverse-geocode?lat=${latitude}&lon=${longitude}`;
      const response = await fetch(apiUrl);
  
      if (!response.ok) {
        throw new Error(`Failed to fetch. Status: ${response.status}`);
      }
  
      const data = await response.json();
      setUserLocation(data);
    } catch (error) {
      console.error("Location Fetch Error:", error.message);
    }
  };
  
  

  return (
    <div className='Location'>
      <h2>Pre Order From</h2>
      {userLocation ? (
        <div>
          <p>Latitude: {userLocation.latitude}</p>
          <p>Longitude: {userLocation.longitude}</p>
          <p>Address: {userLocation.address}</p>
          {/* Display other location information */}
        </div>
      ) : (
        <p>Loading user location...</p>
      )}
    </div>
  );
};

export default LocationApp;
