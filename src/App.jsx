import { useState, useEffect } from "react";
import React from "react";
import LocationForm from "./components/LocationForm";
import LocationMap from "./components/LocationMap";
import TubeFinder from "./components/TubeFinder";
import Suggestions from "./components/Suggestions.jsx";
import {
  fetchNearbyTubeStations,
  checkDistanceBetween,
  getValidRoutes,
} from "./services/TflAPI.js";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import PlacesMap from "./components/PlacesMap.jsx";

function App() {
  // State variables for addresses and error
  const [userAddress, setUserAddress] = useState("");
  const [partnerAddress, setPartnerAddress] = useState("");
  const [error, setError] = useState("");
  const [userCoordinates, setUserCoordinates] = React.useState({
    lat: null,
    lng: null,
  });
  const [partnerCoordinates, setPartnerCoordinates] = React.useState({
    lat: null,
    lng: null,
  });
  const [userOptions, setUserOptions] = useState([]);
  const [dateOptions, setDateOptions] = useState([]);
  const [userStation, setUserStation] = useState("");
  const [dateStation, setDateStation] = useState("");
  const [midpoint, setMidpoint] = React.useState({ lat: 0, lng: 0 });
  const [open, setOpen] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!userAddress || !partnerAddress) {
      setError("Please enter both addresses.");
      return;
    }
  };

  useEffect(() => {
    const calculateMidpoint = () => {
      const midLat = (userCoordinates.lat + partnerCoordinates.lat) / 2;
      console.log("midlat: ", midLat);
      const midLng = (userCoordinates.lng + partnerCoordinates.lng) / 2;
      console.log("midLng", midLng);
      setMidpoint({ lat: midLat, lng: midLng });
    };

    if (userCoordinates && partnerCoordinates) {
      calculateMidpoint();
    }
  }, [userCoordinates, partnerCoordinates]);

  const loadUserOptions = async (inputValue) => {
    try {
      const data = await fetchNearbyTubeStations(inputValue);
      const matchesArray = data.matches;
      const names = matchesArray.map(({ name }) => ({
        value: name,
        label: name,
      }));
      setUserOptions(names);
      return names;
    } catch (error) {
      console.error("Error fetching user stations:", error);
      return [];
    }
  };

  const loadDateOptions = async (inputValue) => {
    try {
      const data = await fetchNearbyTubeStations(inputValue);
      const matchesArray = data.matches;
      const names = matchesArray.map(({ name }) => ({
        value: name,
        label: name,
      }));
      setDateOptions(names);
      return names;
    } catch (error) {
      console.error("Error fetching date stations:", error);
      return [];
    }
  };

  const handleUserSelectChange = (selectedOption) => {
    console.log("User selected:", selectedOption);
    setUserStation(selectedOption.value);
  };

  const handleDateSelectChange = (selectedOption) => {
    console.log("Date selected:", selectedOption);
    setDateStation(selectedOption.value);
    console.log("Date Station: ", dateStation);
  };

  return (
    <>
      <LocationForm
        userAddress={userAddress}
        setUserAddress={setUserAddress}
        userCoordinates={userCoordinates}
        setUserCoordinates={setUserCoordinates}
        partnerAddress={partnerAddress}
        setPartnerAddress={setPartnerAddress}
        partnerCoordinates={partnerCoordinates}
        setPartnerCoordinates={setPartnerCoordinates}
        error={error}
        handleSubmit={handleSubmit}
      />
      {userCoordinates.lat &&
        userCoordinates.lng &&
        partnerCoordinates.lat &&
        partnerCoordinates.lng &&
        // Check if both user and partner coordinates are available
        midpoint.lat !== 0 &&
        midpoint.lng !== 0 && <PlacesMap midpoint={midpoint} />}
    </>
  );
}

export default App;
