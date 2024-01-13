"use client"

import { Button, Card, Label, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


const SearchComponent = () => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');

    const [lonMin, setLonMin] = useState('');
    const [lonMax, setLonMax] = useState('');
    const [latMin, setLatMin] = useState('');
    const [latMax, setLatMax] = useState('');
    
    const[dateMin, setDateMin] = useState('');
    const[dateMax, setDateMax] = useState('');
    
    const [intensityValue, setIntensityValue] = React.useState<number[]>([0,10]);
    
    const handleChange = (event: Event, newValue: number | number[]) => {
        setIntensityValue(newValue as number[]);
      };


    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        // URL to connect to api
        const url = `localhost:5002`;
        // Creates json body object to be passed in post request
        const data = {}

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(responseData => {
                console.log('POST successful:', responseData);
                
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

return (
<form onSubmit={handleSubmit}>
    <div id='searchBlock'>
        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
          Search by Name
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(n) => {setName(n.target.value)}}
            className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <Button gradientMonochrome="success" type="submit"> Search</Button>
    </div>
    
    <hr />
    <div id='filterPart'>
        <div id="typeIntensity">
        <div>
            <label htmlFor="type" className="block text-sm font-medium leading-6 text-gray-900">
                Type
            </label>
            <select
                value={type}
                onChange={(n) => {setType(n.target.value)}}
                id="type"
                name="type"
                className="mt-2 block rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
            <option>Huriccan</option>
            <option>Earthquick</option>
            <option></option>
            <option>Tornado</option>
            </select>
        </div>

        <div>
            <label htmlFor="type" className="block text-sm font-medium leading-6 text-gray-900">
                Intensity
            </label>

            <Box sx={{ width: 300 }}>
                <Slider
                value={intensityValue}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaLabel={() => 'Intensity range'}
                min={0}
                max={10}
                />
            </Box>
        </div>
        </div>

        <div id="coordinates">
        <div>
        <label htmlFor="longitudeMin" className="block text-sm font-medium leading-6 text-gray-900">Longitude(min)</label>
            <div className="mt-2">
                <input
                id="longitudeMin"
                name="longitudeMin"
                type="text"
                value={lonMin}
                onChange={(n) => {setLonMin(n.target.value)}}
                className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
            </div>
        </div>
    
        <div>
        <label htmlFor="longitudeMax" className="block text-sm font-medium leading-6 text-gray-900">Longitude(max)</label>
        <div className="mt-2">
        <input
            id="longitudeMax"
            name="longitudeMax"
            type="text"
            value={lonMax}
            onChange={(n) => {setLonMax(n.target.value)}}
            className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

        />
        </div>
        </div>

        <div>
        <label htmlFor="latitudeMin" className="block text-sm font-medium leading-6 text-gray-900">Latitude(min)</label>
        <div className="mt-2">
        <input
            id="LatitudeMin"
            name="LatitudeMin"
            type="text"
            value={latMin}
            onChange={(n) => {setLatMin(n.target.value)}}
            className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

        />
        </div>
        </div>
        
        <div>
        <label htmlFor="latitudeMax" className="block text-sm font-medium leading-6 text-gray-900">Latitude(max)</label>
        <div className="mt-2">
        <input
            id="LatitudeMax"
            name="LatitudeMax"
            type="text"
            value={latMax}
            onChange={(n) => {setLatMax(n.target.value)}}
            className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

        />
        </div>
        </div>
        </div>

        <div id="date">
        <div>
        <label htmlFor="dateMin" className="block text-sm font-medium leading-6 text-gray-900">Date(min)</label>
        <div className="mt-2">
        <input
            id="dateMin"
            name="dateMin"
            type="text"
            value={dateMin}
            onChange={(n) => {setDateMin(n.target.value)}}
            className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

        />
        </div>
        </div>

        <div>
        <label htmlFor="dateMax" className="block text-sm font-medium leading-6 text-gray-900">Date(max)</label>
        <div className="mt2">
        <input
            id="dateMax"
            name="dateMax"
            type="text"
            value={dateMax}
            onChange={(n) => {setDateMax(n.target.value)}}
            className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

        />
        </div>
        </div>
        </div>

        <div id="searchBtn">
        <Button gradientMonochrome="success" type="submit">Apply filter</Button>
        </div>
        
        
        
      
        
    </div>
</form>
);
}
export default SearchComponent