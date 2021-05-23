const express = require('express');
const path = require('path');
const axios = require('axios');
require('dotenv').config();
const bodyparser = require('body-parser');
const CircularJSON = require('circular-json');
const db = require('./database');
const bcrypt = require ('bcrypt');
const saltRounds = 10;
const port = 8000;

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

//get all dogs (first 25)
app.get("/dogs", (req, res) => {
    let url = `https://api.petfinder.com/v2/animals?type=Dog&limit=50`;
    
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

//get more dogs
app.get("/moredogs/:page", (req, res) => {
    let page = req.params.page;
    let url = `https://api.petfinder.com/v2/animals?type=Dog&limit=50&page=` + page;
    
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

//handle user signup 
app.post("/signup", (req, res) => {
    var user = req.body.user;
    var pass = req.body.pass;

    db.Authentication.count({ username: user })
    .then((count) => {
        if (count > 0) {
            res.send('Account exists for this username. Please login instead.');
        } else {
            bcrypt.hash(pass, saltRounds, function(err, hash) {
                var save = [{username: user, password: hash}];
                db.Authentication.insertMany(save)
                .then((results) => {
                    res.send('Account has been created! Please login');
                })
              });
        }
    })
})


//handle user login
app.post("/login", (req, res) => {
    var user = req.body.user;
    var pass = req.body.pass;

    db.Authentication.findOne({ username: user })
    .then((result) => {
        var hash = result.password;
        bcrypt.compare(pass, hash, function(err,result) {
            if (result) {
                res.send('Login successful');
            } else {
                res.send('Password is incorrect, please try again');
            }
        })
    })
    .catch((err) => {
        res.send('User does not exist, please create an account first')
    })
})


app.listen(port, () => {
    console.log("Express server is listening on port " + port);
});