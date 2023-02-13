const express = require('express');
const articlesRoute = require('./routes/articles-route');
const auth = require('./security/auth');
const database = require('./database/database');

const app = express();

//database management
database.connect();
process.on('SIGINT', () => {
  database.close();
  process.exit();
});

app.use(auth.authenticate);
articlesRoute(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Microservice listening on port ${port}`);
});