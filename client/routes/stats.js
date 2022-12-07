const express = require('express');
const router = express.Router();

router.get('/leaderboard', (req, res) => {
  res.json([
    {
      user: 'TestUser',
      score: 20984465
    },
    {
      user: 'TestUser',
      score: 2098246
    },
    {
      user: 'TestUser',
      score: 2098234
    },
    {
      user: 'TestUser',
      score: 209824
    },
    {
      user: 'TestUser',
      score: 209829
    },
    {
      user: 'TestUser',
      score: 20982
    },
  ])
});

router.get('/player/:playerId', (req, res) => {
  res.json({
    highScore: 160,
    highestTile: 4,
    highestRank: 2,
    highestPercentile: 1
  });
});

router.put('/player/:playerId', (req, res) => {

});

module.exports = router;