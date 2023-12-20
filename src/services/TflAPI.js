const apiKey = import.meta.env.VITE_TFL_API_KEY;

export const fetchNearbyTubeStations = async (query) => {
  // this query returns results for all modes of transport

  const url = `https://api.tfl.gov.uk/StopPoint/Search/${query}`;

  // async/await?
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("Error fetching nearby stations: ", error);
    throw error;
  }

  // be sure to console.log
};

// New function that checks both users travel time between their station

// Below not working, maybe async/await or read chatgpt response

export function checkDistanceBetween(dateStation, userStation) {
  const url = `https://api.tfl.gov.uk/Journey/JourneyResults/${userStation}/to/${dateStation}`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log("journey api data: ", data);
      const journeyTime = data.journeys[0].duration;
      console.log("journeyTime: ", journeyTime);
      return journeyTime; // Return the journey time
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error; // Throw the error for handling elsewhere if needed
    });
}

// Get all valid routes for all lines, including the name and id of the originating and terminating stops for each route.

export function getValidRoutes() {
  const url = "https://api.tfl.gov.uk/Line/Mode/tube/";

  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log("get data: ", data);
    });
}
