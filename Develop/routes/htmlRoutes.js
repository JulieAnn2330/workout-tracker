const express = require('express');
const db = require('../models/workout');
const router = express.Router();
const path = require('path');

// Requiring our custom middleware for checking if a user is logged in

router.get('/exercise', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/exercise.html'));
});

router.get('/stats', function (req, res) {
    rres.sendFile(path.join(__dirname, '../public/stats.html'));
  });

  router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

module.exports = router;
