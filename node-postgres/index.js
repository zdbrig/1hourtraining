const express = require("express");
const axios = require("axios");
const { Client } = require("pg");

const app = express();

app.use(express.json());

const getArticles = async () => {
  try {
    const response = await axios.get("http://python:8080");
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
  return result.rows[0].price;
};

app.get("/articles", async (req, res) => {
  const articles = await getArticles();

  const client = new Client();
  await client.connect();

  const articlesWithPrices = await Promise.all(
    articles.map(async (article) => {
      const price = await getArticlePrice(client, article.id);
      return { ...article, price };
    })
  );

  await client.end();

  res.json(articlesWithPrices);
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
