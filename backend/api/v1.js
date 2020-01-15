const express = require('express');
const router = express.Router();

const RD = require('reallydangerous');
const signer = new RD.TimestampSigner('my-secret');

const MongoClient = require('mongodb').MongoClient;

const env = require('../env.json');

const mongo_url = env.mongo_url;

let db, conn;
MongoClient.connect(mongo_url).then(c => {
  conn = c;
  db = c.db(env.mongo_db);

  console.log('[LOG] Connected to database');
});

router.get('/version', (req, res) => {
  res.json({version: 1});
});

router.post('/auth/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // TODO: Implement database backed authentication
  if (username == 'tkaixiang' || username == 'willi123yao') {
    const token = signer.sign(Buffer.from(username).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, ''));
    res.json({success: true, token});
  }
  else {
    res.json({success: false, error: 'Invalid username or password!'});
  }
});

module.exports = router;