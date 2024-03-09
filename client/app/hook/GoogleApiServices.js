import axios from "axios";
import { GOOGLE_MAPS_API_KEY } from '@env';

const apiKey = GOOGLE_MAPS_API_KEY;

const calculateDistanceAndTime = async (startLat, startLng, destinationLat, destinationLng, mode = 'bicycling') => {
  const baseUrl = "https://maps.googleapis.com/maps/api/distancematrix/json?";
  const ratePerKm = 1;

  const requestUrl = `${baseUrl}origins=${startLat},${startLng}&destinations=${destinationLat},${destinationLng}&mode=${mode}&key=${apiKey}`;

  try {
    const response = await axios.get(requestUrl);

    // Ensure the request was successful and there are results
    if (response.data.status === "OK" && response.data.rows[0].elements[0].status === "OK") {
      const distance = response.data.rows[0].elements[0].distance.text;
      const duration = response.data.rows[0].elements[0].duration.text;

      const distanceInKm = parseFloat(distance.replace(' km', ''));
      const price = distanceInKm * ratePerKm;
      const finalPrice = `$${price.toFixed(2)}`;

      return {
        distance,
        duration,
        finalPrice
      };
    } else {
      console.error("Error calculating distance and duration:", response.data.status);
      // console.log(response.data);
      return null;
    }
  } catch (error) {
    console.error("Failed to calculate distance and duration:", error);
    return null;
  }
};

const extractNumbers = (inputStr) => {
  if (typeof inputStr !== 'string') {
    return [];
  }
  const matched = inputStr.match(/\d+/g);
  return matched ? matched.map(num => parseInt(num, 10)) : [];
};

export default {
  calculateDistanceAndTime,
  extractNumbers
};
