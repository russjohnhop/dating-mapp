"use client";

import { useState, useEffect } from "react";
import React from "react";
import ReactDom from "react-dom";
import "../App.css";

export default function PlacesMap({ midpoint }) {
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    if (!window.google || !window.google.maps) {
      console.error("Google Maps API not loaded");
      return;
    }

    // Initialize the map
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: midpoint.lat, lng: midpoint.lng },
      zoom: 14,
    });

    const marker = new window.google.maps.Marker({
      position: { lat: midpoint.lat, lng: midpoint.lng },
      map,
      title: "Test",
    });

    // Places code start

    // All the types I need to display, loop through?

    let types = [
      "art gallery",
      "bakery",
      "movie_theater",
      "restaurant",
      "shopping mall",
      "cafe",
      "bar",
      "zoo",
    ];

    let request = {
      location: midpoint,
      radius: "500",
      type: ["restaurant"],
    };

    let service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);

    function callback(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          createMarker(results[i]);
        }
      }
    }

    function createMarker(place) {
      if (!place.geometry || !place.geometry.location) return;

      const placeMarker = new google.maps.Marker({
        map,
        // Make marker different
        position: place.geometry.location,
      });

      google.maps.event.addListener(placeMarker, "click", () => {
        infowindow.setContent(place.name || "");
        infowindow.open(map);
      });
    }
  }, [midpoint]);

  return <div id="map" style={{ height: "400px", width: "100%" }}></div>;
}
