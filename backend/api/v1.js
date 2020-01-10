const express = require('express');
const router = express.Router();

const RD = require('reallydangerous');
const signer = new RD.TimestampSigner();

router.get('/version', (req, res) => {
  res.json({version: 1});
});

router.post('/auth/login', (req, res) => {
  const username = req.username;
  const password = req.password;

  // TODO: Implement database backed authentication
  if (username == 'tkaixiang' || username == 'willi123yao') {
    const token = signer.sign(Buffer.from(username).toString('base64'));
    res.json({success: true, token});
  }
  else {
    res.json({success: false, error: 'Invalid username or password!'});
  }
});

module.exports = router;