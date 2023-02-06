const axios = require('axios');

const API_URL = 'http://localhost:8080/article';

async function getArticles() {
  try {
    const response = await axios.get(API_URL);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

async function createArticle(name) {
  try {
    const response = await axios.post(API_URL, { name });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

async function getArticle(id) {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

async function updateArticle(id, name) {
  try {
    const response = await axios.put(`${API_URL}/${id}`, { name });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

async function deleteArticle(id) {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

// Example usage
getArticles();
createArticle('Bacem');
getArticles();
/*getArticle(1);
updateArticle(1, 'Updated Article 1');
deleteArticle(1);
*/
