"use client";

import { useEffect } from "react";
import React from "react";
import "../App.css";

export default function PlacesMap({ midpoint }) {
  useEffect(() => {
    if (!window.google || !window.google.maps) {
      console.error("Google Maps API not loaded");
      return;
    }

    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: midpoint.lat, lng: midpoint.lng },
      zoom: 15,
    });

    const marker = new window.google.maps.Marker({
      position: { lat: midpoint.lat, lng: midpoint.lng },
      map,
      title: "Midpoint",
    });
  }, [midpoint]);

  return <div id="map" style={{ height: "400px", width: "100%" }}></div>;
}
