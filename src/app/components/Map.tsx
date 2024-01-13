"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import DisastersList from "./List";

// Set the path for the Leaflet marker images
const iconRetinaUrl = "/marker-icon-2x.png";
const iconUrl = "/marker-icon.png";
const shadowUrl = "/marker-shadow.png";

// Create a new Leaflet icon
const defaultIcon = new L.Icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Define a type for the item structure
type MapItem = {
  id: number;
  position: [number, number]; // Tuple for latitude and longitude
  label: string;
};

const MyMapComponent: React.FC = () => {
  const [disasters, setDisasters] = useState([]);

  const url = `http://localhost:5002/api/disasters`;

  const getMapData = async () => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setDisasters(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(disasters);

  useEffect(() => {
    getMapData();
  }, []);

  const [items, setItems] = useState<MapItem[]>([
    { id: 1, position: [51.505, -0.09], label: "Marker 1" },
    // ... more items
  ]);

  return (
    <>
      <MapContainer
        center={[20.9791382, 44.2327226]}
        zoom={1}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {items.map((item: MapItem) => (
          <Marker key={item.id} position={item.position} icon={defaultIcon}>
            <Popup>{item.label}</Popup>
          </Marker>
        ))}
      </MapContainer>
      <br />
      <DisastersList />
    </>
  );
};

export default MyMapComponent;
