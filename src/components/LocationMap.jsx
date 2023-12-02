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

const api_key = import.meta.env.VITE_API_KEY;
const map_id = import.meta.env.VITE_MAP_ID;

console.log("API Key: ", api_key);
console.log("MAP_ID: ", map_id);

// Following https://www.youtube.com/watch?v=PfZ4oLftItk&list=PL2rFahu9sLJ2QuJaKKYDaJp0YqjFCDCtN

export default function LocationMap() {
  const position = { lat: 53.54, lng: 10 };
  const [open, setOpen] = useState(false);

  return (
    <>
      <APIProvider apiKey={import.meta.env.VITE_API_KEY}>
        <div style={{ height: "100vh", width: "100%" }}>
          <Map zoom={9} center={position} mapId={import.meta.env.VITE_MAP_ID}>
            <AdvancedMarker position={position} onClick={() => setOpen(true)}>
              <Pin
                background={"grey"}
                borderColor={"green"}
                glyphColor={"purple"}
              />
            </AdvancedMarker>

            {open && (
              <InfoWindow
                position={position}
                onCloseClick={() => setOpen(false)}
              >
                <p>I'm in Hamburg</p>
              </InfoWindow>
            )}
          </Map>
        </div>
      </APIProvider>
    </>
  );
}
