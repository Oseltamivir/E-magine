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

/* API token authentication verification function */
const apiAuth = (req, res) => {
  if(!req.header('Authorization')) {
    res.status(401).json({success: false, error: 'Missing api token!'});
    return;
  }

  const token = req.header('Authorization').split(' ').pop();
  
  try {
    const user = signer.unsign(token);
    req.user = Buffer.from(user, 'base64').toString();
    return true;
  }
  catch (e) {
    res.status(401).json({success: false, error: 'Invalid api token provided!'});
    return false;
  }
}

router.get('/version', (req, res) => {
  res.json({version: 1});
});

/* Login to API using user/pass to obtain token for api */
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
  const user = await db.collection('users').findOne({username, password: hashed}, {_id: 0, id: 1});
  if (!user) {
    res.status(403).json({success: false, error: 'Invalid username or password!'});
    return;
  }

  // Generate API token for user from user ID
  const token = signer.sign(Buffer.from(user.id).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, ''));
  res.json({success: true, token});
});

/* Gets user profile of current logged in user */
router.get('/users/me', async (req, res) => {
  if (!apiAuth(req, res)) return;

  const profile = await db.collection('users').findOne({id: req.user}, {_id: 0, password: 0});

  // Some error trapping
  if (!profile) {
    res.status(500).json({success: false, error: 'Internal server error, please contact administrator.'});
    return;
  }

  delete profile._id;
  res.json({success: true, profile});
});

/* Gets user profile from user ID */
router.get('/users/:id', async (req, res) => {
  if (!apiAuth(req, res)) return;

  const id = req.params.id;
  const profile = await db.collection('users').findOne({id}, {_id: 0, password: 0});
  
  // Some error trapping
  if (!profile) {
    res.status(404).json({success: false, error: 'Requested user profile not found!'});
    return;
  }

  delete profile._id;
  res.json({success: true, profile});
});

module.exports = router;