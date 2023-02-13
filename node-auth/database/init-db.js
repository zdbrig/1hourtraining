const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const url = process.env.DATABASE_URL;
const databaseName = process.env.DATABASE_NAME;
const users = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' },
  // ...
];

async function initDb() {
  const client = new MongoClient(url, { useNewUrlParser: true });
  try {
    await client.connect();
    const db = client.db(databaseName);
    const usersCollection = db.collection('users');
    const existingUsers = await usersCollection.find().toArray();
    if (existingUsers.length === 0) {
      await usersCollection.insertMany(users);
      console.log(`Inserted ${users.length} users into the database`);
    } else {
      console.log(`Users already exist in the database, not inserting`);
    }
  } catch (error) {
    console.error(error);
  } finally {
    client.close();
  }
}

initDb();
