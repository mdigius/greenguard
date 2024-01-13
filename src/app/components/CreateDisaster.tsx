import { Alert, Button, Card, Datepicker, Label, RangeSlider, Select, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { HiInformationCircle } from "react-icons/hi";

const CreateDisaster = () => {
  const [intensity, setIntensity] = useState(5)
  const [name, setName] = useState('')
  const [type, setType] = useState('Earthquake')
  const [long, setLong] = useState(0.00)
  const [lat, setLat] = useState(0.00)
  const [date, setDate] = useState(new Date)
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState('success')

  const validateRange = (value: number, min: number, max: number) => {
   
    return !isNaN(value) && value >= min && value <= max;
  };

    async function handleSubmit(event: React.FormEvent) {
      event.preventDefault()
      const url = `http://localhost:5002/api/disasters`

      const data = {
        name: name,
        type: type,
        intensity: intensity,
        long: long,
        lat: lat,
        date: date
      }
      console.log(data)

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
          setAlertMessage('Successfully added disaster!')
          setAlertType('success')
          setShowAlert(true)
          
        })
        .catch((error) => {
          console.error("Error:", error);
        });



    }

  return (
    <main>
    <div className="hero mt-20 mb-20">
       
        <div className="flex-1 mt-20 padding-x padding-y">

          <h1 className="hero__title">Add a disaster</h1>

          <div>
          <Card className='max-w-xl'>
          <form onSubmit={handleSubmit} className='max-w-xl'>
          <div className="mb-2 block">
            <Label value="Disaster Name:" />
            <TextInput
              required
              placeholder="Example: Katrina"
              shadow
              onChange={(e) => {
                setName(e.target.value)
              }}
            />
          </div>

          
      <div className="mb-2 block">
        <Label htmlFor="countries" value="Type:" />
        <Select id="countries" required onChange={(e) => {
          
          setType(e.target.value)

        }}>
        <option>Earthquake</option>
        <option>Flood</option>
        <option>Tornado</option>
        <option>Hurricane</option>
      </Select>
      </div>
      
      
          <div className="mb-2 block">
          <Label value={`Intensity: ${intensity}`} />
            <RangeSlider id="lg-range" sizing="lg" min={1} max={10} value={intensity} onChange={(e) => {
                setIntensity(parseInt(e.target.value));
              }}/>
          </div>
          <div className="mb-2 block">
            <Label value="Date:" />
            <Datepicker language="eng"
              required
              onSelectedDateChanged={(e) => {
                setDate(e) 
              }
            }
            />
          </div>
          <div className="mb-2 block">
            <Label value="Longitude:" />
            <TextInput
            required
              placeholder="Range: -180 to 180"
              shadow
              onChange={(e) => {
                if (validateRange(parseFloat(e.target.value), -90, 90)) {
                  setLong(parseFloat(e.target.value)) 
                  setShowAlert(false) 
                } else {
                  setAlertMessage('Invalid coordinates!')
                  setAlertType('failure')
                  setShowAlert(true)
                }
              }}
            />
          </div>
          <div className="mb-5 block">
            <Label value="Latitude:" />
            <TextInput
              required
              placeholder="Range: -90 to 90"
              shadow
              onChange={(e) => {
                if (validateRange(parseFloat(e.target.value), -90, 90)) {
                  setLat(parseFloat(e.target.value))
                  setShowAlert(false) 
                } else {
                  setAlertMessage('Invalid coordinates!')
                  setAlertType('failure')
                  setShowAlert(true)
                }
                
                
              }}
            />
          </div>
          <div>
          <Button className = 'mb-5'gradientDuoTone="greenToBlue" type="submit">Report Disaster</Button>

          {showAlert && (
              <Alert color={alertType} icon={HiInformationCircle}>
                {alertMessage}
              </Alert>
            )}
          </div>
           
          </form>
        </Card>
          </div>
          
          </div>
          </div>
  
    </main>
  )
}

export default CreateDisaster