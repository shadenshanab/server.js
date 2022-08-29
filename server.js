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

// http://localhost:3000/getPockData?name=pockName
server.get('/getWeatherData', (req, res) => {
    console.log(req.query.city_name);
    const result = weatherData.find((item) => {
        if (item.city_name == req.query.city_name) {
            return item;
        } else {
            if (item.lat == req.query.lat && item.lon == req.query.lon) {
                return item;
            }
            else {
                alert("Invalid query");
            }
        }
    })
    console.log(result);

    res.send(result.data);
})

server.get('*', (req, res) => {
    res.send("page not found");
})

server.listen(PORT, () => {
    console.log(`connected on port ${PORT}`);
})