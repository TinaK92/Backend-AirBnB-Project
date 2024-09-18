// create an Express router, create a test route, and export the 
// router at the bottom of the file:
// backend/routes/index.js

const express = require('express');
const router = express.Router();

router.get('/hello/world', function(req, res) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.send('Hello World!');
});

module.exports = router;