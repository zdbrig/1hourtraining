const axios = require('axios');

module.exports = function(app) {
  app.get('/articles', (req, res) => {
    axios.get('http://article-api:3000/articles' )
      .then(response => {
        res.send(response.data);
      })
      .catch(error => {
        console.error(error);
        res.status(500).send('Error while fetching data from the microservice');
      });
  });
};
