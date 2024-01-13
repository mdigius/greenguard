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
  const [items, setItems] = useState<any[]>([]);

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
      setItems(
        data.map((disaster) => ({
          position: [disaster.lat, disaster.long],
          name: disaster.name,
          date: disaster.date,
          intensity: disaster.intensity,
          type: disaster.type,
          long: disaster.long,
          lat: disaster.lat,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMapData();
  }, []);

  console.log(items);

  return (
    <>
      <MapContainer
        center={[56.1304, 106.3468]}
        zoom={1}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {items.map((item) => (
          <Marker position={item.position} icon={defaultIcon}>
            <Popup>
              <h3 id="name">
                {item.type} - {item.name}
              </h3>
              <h3 id="intensity">LV. {item.intensity}</h3>
              <h3>
                Location: {item.long}, {item.lat}
              </h3>
              <h3>Date: {item.date}</h3>
              <h3>
                Reported Emergency:{" "}
                {item.intensity * Math.floor(Math.random() * 100) + 90}
              </h3>
              <h3>Suggested Staff: {item.intensity * 10}</h3>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <br />
      <DisastersList />
    </>
  );
};

export default MyMapComponent;
