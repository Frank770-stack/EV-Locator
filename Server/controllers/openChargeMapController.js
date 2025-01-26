import { fetchStationsFromOpenChargeMap } from "../utils/openChargeMap";

export const { latitude, longitude } = req.query;

if (!latitude || !longitude) {
  return res.status(400).json({ error: "Latitude and Longitude are required" });
}

try {
  const stations = await fetchStationsFromOpenChargeMap(latitude, longitude);
  res.status(200).json(stations);
} catch (error) {
  res.status(500).json({ error: "Error fetching data from OpenChargeMap" });
}
