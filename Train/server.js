const express = require('express')
const app = express()
require('dotenv').config()
const path = require('path')
const NodeCache = require('node-cache');
const cache = new NodeCache();
const cors = require('cors')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


function byPrice(array) {
  if (array.length <= 1) {
    return array;
  } else {
    var pivot = array[0];
    var left = [];
    var right = [];
    for (var i = 1; i < array.length; i++) {
      if (array[i].price.AC < pivot.price.AC) {
        left.push(array[i]);
      } else {
        right.push(array[i]);
      }
    }
    return byPrice(left).concat(pivot, byPrice(right));
  }
}

function bySeat(array) {
  const newArr = [];
  if (array.length <= 1) {
    return array;
  } else {
    var start;
    var end;
    for (let i = 0; i < array.length - 1; i++) {
      if (array[i].price.AC === array[i + 1].price.AC) {
        newArr.push(array[i])
        // array = array.filter(function(item) {
        //     // return item !== value
        //     // return item.departureTime.Minutes=array[i].
        // })
        // start = i;
      }
      if (newArr.length > 0) {
        // end = i + 1;
        newArr.push(array[i + 1])
      }
    }

    var pivot = array[0];
    var left = [];
    var right = [];

    // for (var start; start < end; start++) {
    //   if (array[start].price.sleeper < pivot.price.sleeper) {
    //     left.push(array[start]);
    //   } else {
    //     right.push(array[start]);
    //   }
    // }
    for (var i = 0; i < newArr.length + 1; i++) {
      if (array[i].price.sleeper < pivot.price.sleeper) {
        left.push(array[start]);
      } else {
        right.push(array[start]);
      }
    }
    // return bySeat(left).concat(pivot, bySeat(right))
    return newArr
  }
}

app.get('/', (req, res) => {
  res.send("Server running")
})

app.post('/register', (req, res) => {
  console.log(res.body)

  axios.defaults.baseURL = 'http://localhost:8080/';

  axios({
    method: 'POST',
    url: '/register',
    data: req.body,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + accessToken
    },
  })
    .then(function (response) {

      console.log("Register", response);
      res.status(200).send({
        message: response.data
      });

    })
    .catch(function (error) {

      console.log("Error", error.response.data);
      res.status(error.response.status).send({
        message: error.response.data
      });

    });
})


app.post('/auth', (req, res) => {
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


app.get('/train', (req, res) => {
  console.log(res.body)
  var train = []

  const cachedData = cache.get(cacheKey);
  if (cachedData !== undefined) {
    train = cachedData
    return res.json(train);s
  }
  else {

    axios.defaults.baseURL = 'http://localhost:8069';

    axios({
      method: 'GET',
      url: '/train',
      data: {},
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      },
    })
      .then(function (response) {
        const array = response;

        var sortedArray = byPrice(array);
        // console.log("SEAT", bySeat(sortedArray));
        var train = bySeat(sortedArray)
        res.send(train)
      })
      .catch(function (error) {

        console.log("Error", error.response.data);
        res.status(error.response.status).send({
          message: error.response.data
        });

      });
  }
})

app.post('/train/:trainNumber', (req, res) => {
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



var server_port = process.env.YOUR_PORT || process.env.PORT || 8090;
var server_host = process.env.YOUR_HOST || '0.0.0.0';

app.listen(server_port, server_host, (req, res) => {
  console.log(`Server is running at port : ${server_port}`)
})