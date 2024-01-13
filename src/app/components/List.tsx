import React, { useEffect, useState } from "react";
import { Table } from "flowbite-react";

interface AnchorProps extends React.HTMLAttributes<HTMLAnchorElement> {}

const DisastersList: React.FC = () => {
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

  useEffect(() => {
    getMapData();
  }, []);

  return (
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
                <a
                  href="#"
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  Focus
                </a>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default DisastersList;
