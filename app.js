const express = require("express");
const fs = require("fs");
const cors = require("cors");
const csv = require("csv-parser");
const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://mdigius:mdigi2012@cluster0.xfcxsn5.mongodb.net/?retryWrites=true&w=majority";
// Code to kill port: lsof -ti:5002 | xargs kill -9

// Connect to the mongo database
const client = new MongoClient(uri);
try {
  client.connect();
} catch (e) {
  console.error(e);
}

const app = express();

app.use(cors());

// Utilize the fs library to convert the csv files into documents in our mongo collection
fs.createReadStream("MOCK_DATA.csv")
  .pipe(csv())
  .on("data", async (row) => {
    // Checks to see if the record already exists in our collection, if so it will not add it
    const existingRecord = await client
      .db("Disasters")
      .collection("DisasterCollection")
      .findOne({ name: row.name, date: row.date });

    // If it is a new record, adds it to the database
    if (!existingRecord && row.name) {
      const disasterData = {
        name: row.name,
        long: row.long,
        lat: row.lat,
        date: row.date,
        intensity: row.intensity,
        type: row.type,
      };

      await client
        .db("Disasters")
        .collection("DisasterCollection")
        .insertOne(disasterData);
    }
  })
  // Prints a success message if the csv was succesfully parsed
  .on("end", () => {
    console.log("CSV file successfully processed");
  });

app.use(express.json());

// Api routing to handle all requests to post and get disasters
app
  .route("/api/disasters")
  .post(async (req, res) => {
    const name = req.body.name;
    const long = req.body.long;
    const lat = req.body.lat;
    const date = req.body.date;
    const intensity = req.body.intensity;
    const type = req.body.type;
    console.log(type);
    // Returns an error if any required variables were not included in the request body
    if (!name || !long || !lat || !date || !intensity || !type) {
      return res.status(400).json({ error: "Improper parameters in req body" });
    }
    // Converts the req body variables into a json object
    const disasterData = {
      name: name,
      long: long,
      lat: lat,
      date: date,
      intensity: intensity,
      type: type,
    };
    // Inserts the json object into our collection
    await client
      .db("Disasters")
      .collection("DisasterCollection")
      .insertOne(disasterData);
    res.status(201).json({ message: "Successfully inserted disaster" });
  })
  .get(async (req, res) => {
    const name = req.query.name;
    const type = req.query.type;
    const startDateString = req.query.startDate;
    const endDateString = req.query.endDate;
    const minIntensityString = req.query.minIntensity;
    const maxIntensityString = req.query.maxIntensity;

    const query = {};

    if (name !== undefined && name !== "") {
      // Use a case-insensitive regex for partial matching
      query.name = name;
    }

    if (type !== undefined && type !== "" && type.toLowerCase() !== "any" && type.toLowerCase() !== "Any") {
      query.type = type.toLowerCase();
    }

    // if (startDateString !== undefined && endDateString !== "") {
    //   const startDate = new Date(startDateString);
    //   const endDate = new Date(endDateString);
    //   query.date = {
    //     $gte: startDate.toISOString(),
    //     $lte: endDate.toISOString(),
    //   };
    // }

    // if (maxIntensityString !== "") {
    //   const maxIntensity = parseInt(maxIntensityString);
    //   query.intensity = {$lte: maxIntensity };
    // }
    console.log(query)
    console.log(Object.keys(query).length)

    // If no query parameters were provided, return all documents
    if (Object.keys(query).length === 0) {
      const allDisasters = await client
        .db("Disasters")
        .collection("DisasterCollection")
        .find()
        .toArray();

      if (!allDisasters || allDisasters.length === 0) {
        return res.status(404).json({ message: "No disasters found" });
      }

      return res.json(allDisasters);
    }

    // Search for documents in the collection based on the given query
   
      const disasterResults = await client
        .db("Disasters")
        .collection("DisasterCollection")
        .find(query)
        .toArray();

      console.log("result: " + disasterResults);

      if (!disasterResults || disasterResults.length === 0) {
        return res
          .status(404)
          .json({ message: "No disasters found with the specified criteria" });
      }
      return res.json(disasterResults);
    } 
  );

app.listen(5002, () => console.log("Listening on port 5002"));
