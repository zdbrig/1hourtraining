const database = require('../database/database');

async function authenticate(req, res, next) {
  const authorization = req.header('Authorization');
  if (!authorization) {
    return res.status(401).send('Unauthorized');
  }
  const basicAuth = authorization.split(' ')[1];
  const [username, password] = atob(basicAuth).split(':');
  try {
    const users = database.db.collection('users');
    const user = await users.findOne({ username, password });
    if (!user) {
      return res.status(401).send('Unauthorized');
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server error');
  }
}

module.exports = {
  authenticate,
};