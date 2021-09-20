import React, { useState } from "react";
//import mapboxgl from "mapbox-gl";
import MapGL from "react-map-gl";

const TrackerMaps = (props) => {
  const [viewport, setViewport] = useState({
    width: 1000,
    height: 600,
    latitude: 19.7842873,
    longitude: -99.0100649,
    zoom: 14,
  });

  return (
    <MapGL
      {...viewport}
      mapboxApiAccessToken="pk.eyJ1Ijoic2Vydnljb2IiLCJhIjoiY2tzeHVzdXE3MGNhbDMxczZjNG80ZHB3diJ9.vPRSyxh5SWKncgc7EUMUcA"
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    />
  );
};

export default TrackerMaps;
