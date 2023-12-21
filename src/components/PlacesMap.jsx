"use client";

import { useState, useEffect } from "react";
import React from "react";
import ReactDom from "react-dom";
import "../App.css";

export default function PlacesMap({ midpoint }) {
  // useEffect(async () => {
  //   const response = await google.maps.importLibrary("maps");
  //   console.log("response:", response);
  // }, []);

  // below seems to be working but I don't fully understand

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await google.maps.importLibrary("maps");
        console.log("response: ", response);
      } catch (error) {}
    }
    fetchData();
  }, []);

  // Need to use useeffect with the async code from the documentation

  let map;

  async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");
  }

  return <></>;
}
