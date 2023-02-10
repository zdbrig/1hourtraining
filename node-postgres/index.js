const express = require("express");
const axios = require("axios");
const { Client } = require("pg");

const app = express();

app.use(express.json());

const getArticles = async () => {
  try {
    const response = await axios.get("http://python:8080/article");
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

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
