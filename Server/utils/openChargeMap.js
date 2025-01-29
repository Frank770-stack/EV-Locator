import axios from "axios";

export const fetchStationsFromOpenChargeMap = async (latitude, longitude) => {
  const API_URL = "https://api.openchargemap.io/v3/poi/";

  try {
    const response = await axios.get(API_URL, {
      params: {
        latitude,
        longitude,
        maxresults: 10,
        compact: true,
        key: process.env.OPENCHARGEMAP_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch stations from OpenChargeMap");
  }
};
