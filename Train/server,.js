const express = require('express')
const app = express()
require('dotenv').config()
const  path = require('path')
const NodeCache = require('node-cache');
const cache = new NodeCache();

const cors = require('cors')
app.use(express.json()) 
app.use(express.urlencoded({extended: true}))
app.use(cors())


app.get('/',(req,res)=>{
    res.send("Server running")
})

app.post('/register', (req,res)=>{
    console.log(res.body)

    //axios.defaults.baseURL = 'http://XXXXXXXXXXXXXXX:8069/api';

// axios({
//   method: 'POST',
//   url: '/create/res.users', 
//   data: {
//     models: 'res.users',
//     values: "{ 'login': 'john@gmail.com', 'name':'john', 'email':'john@gmail.com', 'password': '123123123' }"
//   },
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded',
//     'Authorization': 'Bearer ' + accessToken
//   },
// })
// .then(function (response) {

//   console.log("Register", response);
//   res.status(200).send({
//     message: response.data
//   });

// })
// .catch(function (error) {

//   console.log("Error", error.response.data);
//   res.status(error.response.status).send({
//     message: error.response.data
//   });

// });
})


app.post('/auth', (req,res)=>{
    console.log(res.body)

    //axios.defaults.baseURL = 'http://XXXXXXXXXXXXXXX:8069/api';

// axios({
//   method: 'POST',
//   url: '/create/res.users', 
//   data: {
//     models: 'res.users',
//     values: "{ 'login': 'john@gmail.com', 'name':'john', 'email':'john@gmail.com', 'password': '123123123' }"
//   },
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded',
//     'Authorization': 'Bearer ' + accessToken
//   },
// })
// .then(function (response) {

//   console.log("Register", response);
//   res.status(200).send({
//     message: response.data
//   });

// })
// .catch(function (error) {

//   console.log("Error", error.response.data);
//   res.status(error.response.status).send({
//     message: error.response.data
//   });

// });
})


app.get('/train', (req,res)=>{
    console.log(res.body)

    //axios.defaults.baseURL = 'http://XXXXXXXXXXXXXXX:8069/api';

// axios({
//   method: 'POST',
//   url: '/create/res.users', 
//   data: {
//     models: 'res.users',
//     values: "{ 'login': 'john@gmail.com', 'name':'john', 'email':'john@gmail.com', 'password': '123123123' }"
//   },
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded',
//     'Authorization': 'Bearer ' + accessToken
//   },
// })
// .then(function (response) {

//   console.log("Register", response);
//   res.status(200).send({
//     message: response.data
//   });

// })
// .catch(function (error) {

//   console.log("Error", error.response.data);
//   res.status(error.response.status).send({
//     message: error.response.data
//   });

// });
})

app.post('/train/:trainNumber', (req,res)=>{
    console.log(res.body)

    //axios.defaults.baseURL = 'http://XXXXXXXXXXXXXXX:8069/api';

// axios({
//   method: 'POST',
//   url: '/create/res.users', 
//   data: {
//     models: 'res.users',
//     values: "{ 'login': 'john@gmail.com', 'name':'john', 'email':'john@gmail.com', 'password': '123123123' }"
//   },
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded',
//     'Authorization': 'Bearer ' + accessToken
//   },
// })
// .then(function (response) {

//   console.log("Register", response);
//   res.status(200).send({
//     message: response.data
//   });

// })
// .catch(function (error) {

//   console.log("Error", error.response.data);
//   res.status(error.response.status).send({
//     message: error.response.data
//   });

// });
})



app.get('/primes',(req,res)=>{
    console.log("prime")
    res.send([2, 3, 5, 7, 11, 13])
})

app.get('/fibo',(req,res)=>{
    res.send([1, 1, 2, 3, 5, 8, 13, 21])
})

app.get('/odd',(req,res)=>{
    res.send([1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23])
})

app.get('/rand',(req,res)=>{
    res.send([5, 17, 3, 19, 76, 24, 1, 5, 10, 34, 8, 27, 7])
})

// Define API route
app.get('/my-route', (req, res) => {
    const cacheKey = 'my-cache-key';
  
    var train=[]
    // Check if data is in cache
    const cachedData = cache.get(cacheKey);
    if (cachedData !== undefined) {
      // Data is in cache, return it
      train = cachedData
      return res.json(cachedData);
    }
    else{
        axios.get('https://some-api.com/data')
        .then(response => {
          // Cache data for future use
          cache.set(cacheKey, response.data, 60); // Cache for 60 seconds
    
          // Return response data to client
          train = response.data
          //res.json(response.data);

        })
        .catch(error => {
          console.error(error);
          res.status(500).json({ error: 'Failed to fetch data' });
        });
    }
  
    // Data is not in cache, make API call

  });

  

var server_port = process.env.YOUR_PORT || process.env.PORT || 8090;
var server_host = process.env.YOUR_HOST || '0.0.0.0';
 
app.listen(server_port, server_host,(req,res)=>{
    console.log(`Server is running at port : ${server_port}`)
})