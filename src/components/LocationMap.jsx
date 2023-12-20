"use client";

import { useState, useEffect } from "react";
import React from "react";
import ReactDom from "react-dom";
import "../App.css";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

// Following https://www.youtube.com/watch?v=PfZ4oLftItk&list=PL2rFahu9sLJ2QuJaKKYDaJp0YqjFCDCtN

export default function LocationMap({
  userCoordinates,
  partnerCoordinates,
  midpoint,
  setMidpoint,
  open,
  setOpen,
}) {
  const isValidCoordinates =
    userCoordinates.lat !== null &&
    userCoordinates.lng !== null &&
    partnerCoordinates.lat !== null &&
    partnerCoordinates.lng !== null;
  console.log("user coords: ", userCoordinates);
  console.log("partner coords", partnerCoordinates);
  console.log("midpoint:", midpoint);
  return (
    <>
      {isValidCoordinates && ( // Conditionally render if there's a valid midpoint
        <APIProvider apiKey={import.meta.env.VITE_API_KEY}>
          <div style={{ height: "100vh", width: "100%" }}>
            <Map
              zoom={14}
              center={midpoint}
              mapId={import.meta.env.VITE_MAP_ID}
            >
              <AdvancedMarker
                position={midpoint}
                onClick={() => setOpen(true)}
              ></AdvancedMarker>

              {open && (
                <InfoWindow
                  position={midpoint}
                  onCloseClick={() => setOpen(false)}
                >
                  <p>Hello!</p>
                </InfoWindow>
              )}
            </Map>
          </div>
        </APIProvider>
      )}
      {!isValidCoordinates && <p></p>}
    </>
  );
}
