const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 8080;


// Routes
require('./routes')(app, axios);
app.get('/all', (req, res) =>{
    res.set({'Content-Type': 'application/json'})
    const username = req.headers.username;
    const config ={
        method: 'GET',
        url: `https://medium.com/@${username}/latest`,
        headers:{
            'accept':'application/json'
        }
    }
    // Make Request to Medium
    axios(config)
    .then((response) =>{
        const data = JSON.parse(response.data.substr(16));
        res.send(data)
    })
    .catch((error) =>{
        throw error;
    })
})


app.listen(port, () => console.log(`Server started on port: ${port}`));
