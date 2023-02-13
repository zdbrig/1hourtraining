const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const database = {
  async connect() {
    this.client = new MongoClient(process.env.DATABASE_URL, { useNewUrlParser: true });
    try {
      await this.client.connect();
      this.db = this.client.db(process.env.DATABASE_NAME);
      console.log(`Connected to database: ${process.env.DATABASE_NAME}`);
    } catch (error) {
      console.error(error);
    }
  },

  async close() {
    try {
      await this.client.close();
      console.log(`Closed connection to database: ${process.env.DATABASE_NAME}`);
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = database;
