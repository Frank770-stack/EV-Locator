import { fetchStationsFromOpenChargeMap } from "../utils/openChargeMap.js";

// Controller to fetch nearby charging stations
export const getNearbyChargingStations = async (req, res) => {
  const { latitude, longitude } = req.query;

  // Validate required query parameters
  if (!latitude || !longitude) {
    return res
      .status(400)
      .json({ error: "Latitude and Longitude are required" });
  }

  try {
    // Fetch data from OpenChargeMap utility
    const stations = await fetchStationsFromOpenChargeMap(latitude, longitude);
    res.status(200).json(stations);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data from OpenChargeMap" });
  }
};
