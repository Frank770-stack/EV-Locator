import { fetchStationsFromOpenChargeMap } from "../utils/openChargeMap.js";
import { findNearestChargingStation } from "../utils/locationUtils.js";

export const getNearestChargingStation = async (req, res) => {
  const { latitude, longitude } = req.query;

  // Check if latitude and longitude are provided
  if (!latitude || !longitude) {
    return res
      .status(400)
      .json({ error: "Latitude and Longitude are required" });
  }

  try {
    // Fetch stations from OpenChargeMap
    const stations = await fetchStationsFromOpenChargeMap(latitude, longitude);

    // Find the nearest station
    const nearestStation = findNearestChargingStation(
      parseFloat(latitude),
      parseFloat(longitude),
      stations
    );

    // If no station found, return an error
    if (!nearestStation) {
      return res
        .status(404)
        .json({ error: "No charging stations found nearby" });
    }

    // Return the nearest station
    res.status(200).json(nearestStation);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data from OpenChargeMap" });
  }
};
