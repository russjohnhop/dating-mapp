import { useState, useEffect } from "react";
import React from "react";
import LocationForm from "./components/LocationForm";
import PlacesMap from "./components/PlacesMap.jsx";
import "./index.css";

function App() {
  const [userAddress, setUserAddress] = useState("");
  const [partnerAddress, setPartnerAddress] = useState("");
  const [userCoordinates, setUserCoordinates] = React.useState({
    lat: null,
    lng: null,
  });
  const [partnerCoordinates, setPartnerCoordinates] = React.useState({
    lat: null,
    lng: null,
  });
  const [midpoint, setMidpoint] = React.useState({ lat: 0, lng: 0 });

  useEffect(() => {
    const calculateMidpoint = () => {
      const midLat = (userCoordinates.lat + partnerCoordinates.lat) / 2;
      const midLng = (userCoordinates.lng + partnerCoordinates.lng) / 2;
      setMidpoint({ lat: midLat, lng: midLng });
    };

    if (userCoordinates && partnerCoordinates) {
      calculateMidpoint();
    }
  }, [userCoordinates, partnerCoordinates]);

  return (
    <>
      <LocationForm
        userAddress={userAddress}
        setUserAddress={setUserAddress}
        setUserCoordinates={setUserCoordinates}
        partnerAddress={partnerAddress}
        setPartnerAddress={setPartnerAddress}
        setPartnerCoordinates={setPartnerCoordinates}
      />
      {userCoordinates.lat &&
        userCoordinates.lng &&
        partnerCoordinates.lat &&
        partnerCoordinates.lng &&
        // Render map when both user and partner coordinates are available
        midpoint.lat !== 0 &&
        midpoint.lng !== 0 && <PlacesMap midpoint={midpoint} />}
    </>
  );
}

export default App;
