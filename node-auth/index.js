const express = require('express');
const axios = require('axios');
const btoa = require('btoa');
const app = express();

const username = 'your_username';
const password = 'your_password';
const basicAuth = 'Basic ' + btoa(username + ':' + password);

app.use((req, res, next) => {
  const authorization = req.header('Authorization');
  if (!authorization || authorization !== basicAuth) {
    return res.status(401).send('Unauthorized');
  }
  next();
});

app.get('/articles', (req, res) => {
  axios.get('http://article-api:3000/articles?username=' + username)
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error while fetching data from the microservice');
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Microservice listening on port ${port}`);
});