const express = require('express')
const app = express()
require('dotenv').config()
const path = require('path')
// const NodeCache = require('node-cache');
// const cache = new NodeCache();
const axios = require('axios')
const fetch = require('cross-fetch');



function quickSortByPrice(arr) {
    if (arr.length <= 1) {
      return arr;
    }
  
    const pivot = arr[0];
    const left = [];
    const right = [];
  
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < pivot) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
  
    return quickSortByPrice(left).concat(arr[0], quickSortByPrice(right));
  }

app.get('/number', async (req, res) => {
    var train = []
    req.query.url.forEach(async x => {
        await axios.get(`${x}`)
            .then(response => {
                // Cache data for future use
                //   cache.set(cacheKey, response.data, 60); // Cache for 60 seconds

                // Return response data to client
                for(i=0 ;  i<response.data.listen ; i++){
                    train.push(response.data[i])
                }
                console.log(response.data)
                //res.json(response.data);

            })
            .catch(error => {
                console.error(error);
                // return res.json({ error: 'Failed to fetch data' });
            });
            
    })
        console.log(train)

    res.send("Server running")
})








var server_port = process.env.YOUR_PORT || process.env.PORT || 8000;
var server_host = process.env.YOUR_HOST || '0.0.0.0';

app.listen(server_port, server_host, (req, res) => {
    console.log(`Server is running at port : ${server_port}`)
})