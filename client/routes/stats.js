const express = require('express');
const router = express.Router();
const redis = require('../redis');

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

router.put('/player/:playerId', async (req, res) => {
  const playerId = req.params.playerId;
  const highestTile = req.body.highestTile;
  const highScore = req.body.highScore;
  const username = req.body.username;
  if (!await redis.exists(playerId)) {
    redis.hSet (playerId, {
      highestTile: highestTile,
      highScore: highScore,
      username: username
    });
    return;
  }
  const playerRecords = await redis.hGetAll(playerId);
  if (playerRecords.highestTile < highestTile) await redis.hSet(playerId, 'highestTile', highestTile);
  if (playerRecords.highScore < highScore) await redis.hSet(playerId, 'highScore', highScore);
  if (playerRecords.username != username) await redis.hSet(playerId, 'username', username);
});

module.exports = router;