"use client"
import { Label, TextInput, Button, Alert } from 'flowbite-react'
import React, { useState } from 'react'

const SearchComponent = () => {
    const [name, setName] = useState('')
    const [long, setLong] = useState('')
    const [lat, setLat] = useState('')
    const [intensity, setIntensity] = useState('')
    const [type, setType] = useState('')
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
    <main>
    <div>
        <form className="" onSubmit={handleSubmit}>
                    <div>
                        <div className="mb-2 block">
                            <Label value="Name" />
                        </div>
                        <TextInput
                            id="username2"
                            type="username"
                            placeholder="Enter username"
                            required
                            shadow
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <Button className="transition-transform transform hover:scale-105" gradientDuoTone="purpleToBlue" type="submit">Search</Button>
                    
                </form>
    </div>
    </main>
  )
}

export default SearchComponent