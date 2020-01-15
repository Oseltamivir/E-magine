const express = require('express');
const router = express.Router();

const RD = require('reallydangerous');
const signer = new RD.TimestampSigner('my-secret');

const MongoClient = require('mongodb').MongoClient;
const crypto = require('crypto');

const env = require('../env.json');

const mongo_url = env.mongo_url;

let db, conn;
MongoClient.connect(mongo_url, { useUnifiedTopology: true }).then(c => {
  conn = c;
  db = c.db(env.mongo_db);

  console.log('[LOG] Connected to database');
});

router.get('/version', (req, res) => {
  res.json({version: 1});
});

router.post('/auth/login', async (req, res) => {
  if (!req.body.hasOwnProperty('username') || !req.body.hasOwnProperty('password')) {
    res.status(400).json({success: false, error: 'Username and password is required!'});
    return;
  }

  const username = req.body.username;
  const password = req.body.password;

  // Hash user password (in hex)
  const hashed = crypto.createHash('sha256').update(password).digest('hex');

  // Check login
  const user = await db.collection('users').findOne({username, password: hashed});
  if (!user) {
    res.status(403).json({success: false, error: 'Invalid username or password!'});
    return;
  }

  // Generate API token for user
  const token = signer.sign(Buffer.from(username).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, ''));
  res.json({success: true, token});
});

module.exports = router;