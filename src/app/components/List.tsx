"use client";

import React, { useCallback, useEffect, useState, useRef } from "react";
import { Datepicker, Table } from "flowbite-react";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Button, Card, Label, TextInput } from "flowbite-react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const iconRetinaUrl = "/marker-icon-2x.png";
const iconUrl = "/marker-icon.png";
const shadowUrl = "/marker-shadow.png";

const defaultIcon = new L.Icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const DisastersList: React.FC = () => {
  const [disasters, setDisasters] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("any");

  const [lonMin, setLonMin] = useState("");
  const [lonMax, setLonMax] = useState("");
  const [latMin, setLatMin] = useState("");
  const [latMax, setLatMax] = useState("");

  const [dateMin, setDateMin] = useState(new Date());
  const [dateMax, setDateMax] = useState(new Date());

  const [marker, setMarker] = useState<any[]>([]);

  const [intensityValue, setIntensityValue] = React.useState<number[]>([0, 10]);

  const mapRef = useRef<any>(null);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setIntensityValue(newValue as number[]);
  };
  async function handleFilterSubmit(event: React.FormEvent) {
    event.preventDefault();
    const url = "http://localhost:5002/api/disasters";

    // Convert date objects to string representations
    const isoStartDate = dateMin.toISOString();
    const isoEndDate = dateMax.toISOString();

    // Convert number values to strings
    const stringMinIntensity = String(intensityValue[0]);
    const stringMaxIntensity = String(intensityValue[1]);

    const data = {
      name: name,
      type: type,
      startDate: isoStartDate,
      endDate: isoEndDate,
      minIntensity: stringMinIntensity,
      maxIntensity: stringMaxIntensity,
    };

    console.log(data);

    // Convert data object to URLSearchParams
    const params = new URLSearchParams(data);

    // Combine URL and parameters
    const urlWithParams = `${url}?${params.toString()}`;

    fetch(urlWithParams, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((responseData) => {
        console.log("GET successful:", responseData);
        setDisasters(responseData);
        setMarker(
          responseData.map((disaster) => ({
            position: [disaster.lat, disaster.long],
            name: disaster.name,
            date: disaster.date,
            intensity: disaster.intensity,
            type: disaster.type,
            long: disaster.long,
            lat: disaster.lat,
            image:
              disaster.type === "earthquake"
                ? "earthquake.png"
                : "flood"
                ? "flood.png"
                : "hurricane"
                ? "hurricane.png"
                : "tornado.png",
          }))
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    // URL to connect to api
    const url = `localhost:5002`;
    // Creates json body object to be passed in post request
    const data = {};

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((responseData) => {
        console.log("POST successful:", responseData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

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
      setMarker(
        data.map((disaster) => ({
          position: [disaster.lat, disaster.long],
          name: disaster.name,
          date: disaster.date,
          intensity: disaster.intensity,
          type: disaster.type,
          long: disaster.long,
          lat: disaster.lat,
          image:
            disaster.type === "earthquake"
              ? "earthquake.png"
              : "flood"
              ? "flood.png"
              : "hurricane"
              ? "hurricane.png"
              : "tornado.png",
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const searchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5002/api/disasters?name=${name}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setDisasters(data);
      setMarker(
        data.map((disaster) => ({
          position: [disaster.lat, disaster.long],
          name: disaster.name,
          date: disaster.date,
          intensity: disaster.intensity,
          type: disaster.type,
          long: disaster.long,
          lat: disaster.lat,
          image:
            disaster.type === "earthquake"
              ? "earthquake.png"
              : "flood"
              ? "flood.png"
              : "hurricane"
              ? "hurricane.png"
              : "tornado.png",
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMapData();
  }, []);

  const focusMap = (lat: number, long: number) => {
    const map = mapRef.current;
    if (map) {
      map.setView([lat, long], 13);
    }
  };

  const MapInitializer = () => {
    const map = useMap();
    mapRef.current = map;
    return null;
  };

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <div>
        <form onSubmit={handleSubmit}>
          <div id="searchBlock">
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Search by Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(n) => {
                  setName(n.target.value);
                }}
                className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <Button
              gradientMonochrome="success"
              type="submit"
              onClick={searchData}
            >
              Search
            </Button>
          </div>

          <hr />
        </form>
        <form onSubmit={handleFilterSubmit}>
          <div id="filterPart">
            <div id="typeIntensity">
              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Type
                </label>
                <select
                  value={type}
                  onChange={(n) => {
                    setType(n.target.value);
                  }}
                  id="type"
                  name="type"
                  className="mt-2 block rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option>Any</option>
                  <option>Earthquake</option>
                  <option>Flood</option>
                  <option>Tornado</option>
                  <option>Hurricane</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Intensity
                </label>

                <Box sx={{ width: 300 }}>
                  <Slider
                    value={intensityValue}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaLabel={() => "Intensity range"}
                    min={0}
                    max={10}
                  />
                </Box>
              </div>
            </div>

            <div id="date">
              <div>
                <div className="mb-2 block">
                  <Label value="Min Date:" />
                  <Datepicker
                    language="eng"
                    required
                    onSelectedDateChanged={(e) => {
                      setDateMin(e);
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 block">
                  <Label value="Max Date:" />
                  <Datepicker
                    language="eng"
                    required
                    onSelectedDateChanged={(e) => {
                      setDateMax(e);
                    }}
                  />
                </div>
              </div>
            </div>

            <div id="filterBtn">
              <Button gradientMonochrome="success" type="submit">
                Apply filter
              </Button>
            </div>
          </div>
        </form>
      </div>
      <br />
      <div>
        <MapContainer
          center={[56.1304, 106.3468]}
          zoom={3}
          scrollWheelZoom={false}
          style={{ height: "400px", width: "100%", zIndex: 1 }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapInitializer />
          {marker.map((item) => (
            <Marker position={item.position} icon={defaultIcon}>
              <Popup>
                <div
                  style={{
                    display: "flex",
                    width: "366px",
                    padding: "12px",
                    alignItems: "center",
                    gap: "24px",
                  }}
                >
                  <img src={item.image} />
                  <div>
                    <h3
                      style={{
                        color: "var(--Neutral-500, #737373)",
                        textAlign: "justify",
                        fontFamily: "Inter",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "20px",
                      }}
                    >
                      {item.type} - {item.name}
                    </h3>
                    <h3
                      style={{
                        color: "var(--Neutral-900, #171717)",
                        textAlign: "justify",
                        fontFamily: "Inter",
                        fontSize: "28px",
                        fontStyle: "normal",
                        fontWeight: 700,
                        lineHeight: "36px",
                        letterSpacing: "-0.56px",
                      }}
                    >
                      LV. {item.intensity}
                    </h3>
                    <h3
                      style={{
                        color: "var(--Neutral-500, #737373)",
                        textAlign: "justify",
                        fontFamily: "Inter",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "20px",
                      }}
                    >
                      Location: {item.lat}, {item.long}
                      <br />
                      Date: {item.date}
                    </h3>
                    <h3
                      style={{
                        color: "var(--Warning-600, #D97706)",
                        textAlign: "justify",
                        fontFamily: "Inter",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 600,
                        lineHeight: "20px",
                      }}
                    >
                      Reported Emergency:{" "}
                      {item.intensity * Math.floor(Math.random() * 100) + 90}
                    </h3>
                    <h3
                      style={{
                        color: "var(--success-500-main, #22C55E)",
                        textAlign: "justify",
                        fontFamily: "Inter",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 600,
                        lineHeight: "20px",
                      }}
                    >
                      Suggested Staff: {item.intensity * 10}
                    </h3>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <br />
      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>Disaster Name</Table.HeadCell>
            <Table.HeadCell>longitude</Table.HeadCell>
            <Table.HeadCell>latitude</Table.HeadCell>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>Intensity</Table.HeadCell>
            <Table.HeadCell>Type</Table.HeadCell>
            <Table.HeadCell> Click To Focus</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {disasters.map((disaster) => (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {disaster.name}
                </Table.Cell>
                <Table.Cell>{disaster.long}</Table.Cell>
                <Table.Cell>{disaster.lat}</Table.Cell>
                <Table.Cell>{disaster.date}</Table.Cell>
                <Table.Cell>{disaster.intensity}</Table.Cell>
                <Table.Cell>{disaster.type}</Table.Cell>
                <Table.Cell>
                  <button
                    onClick={() => {
                      focusMap(disaster.lat, disaster.long);
                    }}
                  >
                    Focus
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </>
  );
};

export default DisastersList;
