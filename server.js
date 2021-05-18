const express = require('express');
const path = require('path');
const axios = require('axios');
require('dotenv').config();
const bodyparser = require('body-parser');
const CircularJSON = require('circular-json');
const port = 8000;

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

//get all dogs (first 25)
app.get("/dogs", (req, res) => {
    let url = `https://api.petfinder.com/v2/animals?type=Dog`;
    
    axios.get(url, {
        headers: {
            'Authorization': 'Bearer ' + process.env.PETFINDER_API
        }
    })
    .then((response) => {
        res.status(200).send(CircularJSON.stringify(response.data));
    })
    .catch((err) => {
        console.log('err: ', err)
    })
});

//get dogs in a single zip code
app.get("/dogs/:zipcode", (req, res) => {
    let zipcode = req.params.zipcode;
    let url = `https://api.petfinder.com/v2/animals?type=Dog&location=` + zipcode;
    
    axios.get(url, {
        headers: {
            'Authorization': 'Bearer ' + process.env.PETFINDER_API
        }
    })
    .then((response) => {
        res.status(200).send(CircularJSON.stringify(response.data));
    })
    .catch((err) => {
        console.log('err: ', err)
    })
});



app.listen(port, () => {
    console.log("Express server is listening on port " + port);
});