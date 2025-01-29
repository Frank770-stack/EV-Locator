import { useState } from "react";
import React from "react";
import axios from "axios";
import "./evLocator.css";

const EVLocator = () => {
  const [location, setLocation] = useState(null);
  const [station, setStation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          fetchNearestStation(latitude, longitude);
        },
        (error) => {
          setError("Please enable location services.");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  const fetchNearestStation = async (latitude, longitude) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://ev-locator-2sen.onrender.com/api/stations?latitude=${latitude}&longitude=${longitude}`
      );
      setStation(response.data);
    } catch (err) {
      setError("Error fetching EV station.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Find Nearest EV Charging Station</h1>
      <button onClick={getUserLocation}>Find Station</button>

      {error && <p className="error">{error}</p>}

      {location && (
        <p>
          Your Location: {location.latitude}, {location.longitude}
        </p>
      )}

      {loading && <p>Loading...</p>}

      {station && (
        <div className="station-info">
          <h2>Nearest Charging Station</h2>
          <p>{station.AddressInfo.Title}</p>
          <p>{station.AddressInfo.AddressLine1}</p>
          <p className="distance">
            Distance: {station.AddressInfo.Distance} km
          </p>
        </div>
      )}
    </div>
  );
};

export default EVLocator;
