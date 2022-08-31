require('dotenv').config();
const express = require('express'); //import express framework
const cors = require('cors');
const server = express();
const weatherData = require('./data/weather.json');

server.use(cors()); // make the server opened for any request

// local ip address
//port

const PORT = process.env.PORT;


// http://localhost:3000/
server.get('/', (req, res) => {
    res.send("Hi from the home route");
    console.log("connected?")
})


// http://localhost:3000/test
server.get('/test', (req, res) => {
    console.log("test route");
    res.send('Hi from the other side');
})

// http://localhost:3000/getWeatherDescription
server.get('/getWeatherDescription', (req, res) => {
    let weatherDescription = weatherData.map((item) => {
        return item.city_name;
    })
    res.send(weatherDescription);
})

// http://localhost:3000/getWeatherData?name=name
server.get('/getWeatherData', (req, res) => {
    console.log('from request');
    console.log(req.query.name);
    const result = weatherData.find((item) => {
        if (item.city_name.toLowerCase == req.query.name.toLowerCase) {
            return item;
        }
        // else {
        //     if (item.lat == req.query.lat && item.lon == req.query.lon) {
        //         return item;
        //     }
        //     else {
        //         return ("Invalid query");
        //     }
        // }
    })
    console.log('to be sent');
    console.log(result.city_name);

    res.send(result);
})

server.get('*', (req, res) => {
    res.send("page not found");
})

server.listen(PORT, () => {
    console.log(`connected on port ${PORT}`);
})