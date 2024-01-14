"use client";

import React, { useCallback, useEffect, useState, useRef } from "react";
import { Datepicker, RangeSlider, Table } from "flowbite-react";

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

  const [items, setItems] = useState<any[]>([]);

  const [intensityValue, setIntensityValue] = useState(5);

  const mapRef = useRef<any>(null);
  const sortData = (key: any) => {
    setDisasters((prevDisasters) => {
      const sortedData = [...prevDisasters].sort((a, b) => {
        if (a[key] < b[key]) {
          return -1;
        }
        if (a[key] > b[key]) {
          return 1;
        }
        return 0;
      });

      return sortedData;
    });
  };
  
  async function handleFilterSubmit(event: React.FormEvent) {
    event.preventDefault();
    const url = "http://localhost:5002/api/disasters";

    // Convert date objects to string representations
    const isoStartDate = dateMin.toISOString();
    const isoEndDate = dateMax.toISOString();

    // Convert number values to strings
    
    const stringMaxIntensity = String(intensityValue);

    const data = {
      name: name,
      type: type.toLowerCase(),
      // startDate: isoStartDate,
      // endDate: isoEndDate,
      // minIntensity: stringMinIntensity,
      maxIntensity: stringMaxIntensity
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
          setDisasters([])
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((responseData) => {
        console.log("GET successful:", responseData);
        setDisasters(responseData);
        setItems(
          responseData.map((disaster) => ({
            position: [disaster.lat, disaster.long],
            name: disaster.name,
            date: disaster.date,
            intensity: disaster.intensity,
            type: disaster.type,
            long: disaster.long,
            lat: disaster.lat,
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
    const url = `http://localhost:5002/api/disasters`;
    // Creates json body object to be passed in post request
    const data = {
      name: name
    };

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
          setDisasters([])
          
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((responseData) => {
        console.log("GET successful:", responseData);
        setDisasters(responseData);
        setItems(
          responseData.map((disaster) => ({
            position: [disaster.lat, disaster.long],
            name: disaster.name,
            date: disaster.date,
            intensity: disaster.intensity,
            type: disaster.type,
            long: disaster.long,
            lat: disaster.lat,
          }))
        );
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
              <div className="mb-2 block">
          <Label value={` Max Intensity: ${intensityValue}`} />
            <RangeSlider id="lg-range" sizing="lg" min={1} max={10} value={intensityValue} onChange={(e) => {
                setIntensityValue(parseInt(e.target.value));
              }}/>
          </div>
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
          {items.map((item) => (
            <Marker position={item.position} icon={defaultIcon}>
              <Popup>
                <h3 id="name">
                  {item.type} - {item.name}
                </h3>
                <h3 id="intensity">LV. {item.intensity}</h3>
                <h3>
                  Location: {item.lat}, {item.long}
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
      </div>
      <br />
      <div className="overflow-x-auto">
        <Table>
        <Table.Head>
          <Table.HeadCell onClick={() => sortData('name')}>Disaster Name</Table.HeadCell>
          <Table.HeadCell onClick={() => sortData('longitude')}>Longitude</Table.HeadCell>
          <Table.HeadCell onClick={() => sortData('latitude')}>Latitude</Table.HeadCell>
          <Table.HeadCell onClick={() => sortData('date')}>Date</Table.HeadCell>
          <Table.HeadCell onClick={() => sortData('intensity')}>Intensity</Table.HeadCell>
          <Table.HeadCell onClick={() => sortData('type')}>Type</Table.HeadCell>
          <Table.HeadCell>Click To Focus</Table.HeadCell>
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
