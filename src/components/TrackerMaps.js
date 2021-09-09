import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const TrackerMaps = () => {
  const [map, setMap] = useState(null);
  const mapView = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoic2Vydnljb2IiLCJhIjoiY2tzeHVzdXE3MGNhbDMxczZjNG80ZHB3diJ9.vPRSyxh5SWKncgc7EUMUcA";
    const initializeMap = ({ setMap, mapContainer }) => {
      const mapas = new mapboxgl.Map({
        container: mapView.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-99.0100649, 19.7842873],
        zoom: 9,
      });

      mapas.on("load", () => {
        setMap(mapas);
        mapas.resize();
      });
    };

    if (!map) initializeMap({ setMap, mapView });
  }, [map]);

  return (
    <div
      style={{
        position: "absolute",
        // width: "100vw",
        // height: "calc(100vh - 80px)",
      }}
      ref={mapView.current}
    />
  );
};

export default TrackerMaps;
