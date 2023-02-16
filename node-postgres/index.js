const express = require("express");
const axios = require("axios");
const { Client } = require("pg");
const amqp = require('amqplib');
const queueName = 'SqoinQueue';
const app = express();

app.use(express.json());
const logger = require('./logger');
console.log = logger;
console.error = logger;

const getArticles = async () => {
  try {
    console.log("getting articles");
    const response = await axios.get("http://python:8080/article");
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};







app.post('/api/messages', async (req, res) => {
  try {
    const msg = req.body.message;
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName);
    await channel.sendToQueue(queueName, Buffer.from(msg));
    console.log(`Message sent to ${queueName}: ${msg}`);
    await channel.close();
    await connection.close();
    res.status(200).send(`Message sent to ${queueName}: ${msg}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error sending message to RabbitMQ queue');
  }
});


const getArticlePrice = async (client, articleId) => {
  const result = await client.query(
    "SELECT price FROM article WHERE id = $1",
    [articleId]
  );
  if (!result.rows[0]) {
    return 0;
  }
  return result.rows[0].price;
};

app.get("/articles", async (req, res) => {
  const articles = await getArticles();
  
  const client = new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database:process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
  });
  await client.connect();

  const articlesWithPrices = await Promise.all(
    articles.map(async (article) => {
      const price = await getArticlePrice(client, article[0]);
      return { ...article, price };
    })
  );

  await client.end();

  res.json(articlesWithPrices);
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
