import { useState, useEffect } from "react";
import React from "react";
import ReactDom from "react-dom";
import "../App.css";

export default function LocationForm() {
  // https://places.googleapis.com/v1/places/ChIJj61dQgK6j4AR4GeTYWZsKWw?fields=id,displayName&key=YOUR_API_KEY
  const [userAddress, setUserAddress] = useState("");
  const [partnerAddress, setPartnerAddress] = useState("");
  const [error, setError] = useState("");

  // Use user address and partner address to search on the api

  // Steps

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!userAddress || !partnerAddress) {
      setError("Please enter both addresses.");
      return;
    }

    console.log("User Address: ", userAddress);
    console.log("Partner Address: ", partnerAddress);

    setError("");
  };

  return (
    <div>
      <h1>Enter Your Location</h1>
      <form onSubmit={handleSubmit}>
        <label>Your address</label>
        <input
          type="text"
          name="user-address"
          required
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
        ></input>
        <br></br>
        <label>Date's address</label>
        <input
          type="text"
          id="partnerAddress"
          name="partnerAddress"
          value={partnerAddress}
          onChange={(e) => setPartnerAddress(e.target.value)}
          required
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
