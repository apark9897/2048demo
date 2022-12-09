const express = require('express');
const router = express.Router();
const redis = require('../redis');

router.get('/leaderboard', async (req, res) => {
  const leaderboard = await redis.zRangeWithScores('leaderboard', '+inf', '-inf', { BY: 'SCORE', REV: true, LIMIT: { offset: 0, count: 10 } });
  for (let ranker of leaderboard) {
    ranker.username = await redis.hGet(ranker.value, 'username') || 'UnknownPlayer';
  }
  res.json(leaderboard);
});

router.get('/player/:playerId', async (req, res) => {
  if (!await redis.exists(req.params.playerId)) {
    return res.sendStatus(404);
  }
  const playerStats = await redis.hGetAll(req.params.playerId);
  res.json(playerStats);
});

router.put('/player/:playerId', async (req, res) => {
  const playerId = req.params.playerId;
  const highestTile = req.body.highestTile;
  const highScore = req.body.highScore;
  const username = req.body.username;
  const [newRank, newPercentile] = await updateCurrentStanding(highScore, playerId);
  redis.hSet(playerId, {
    highestTile: highestTile,
    highScore: highScore,
    username: username,
    currentRank: newRank,
    currentPercentile: newPercentile
  });
  res.json({ status: 'success' });
});

async function updateCurrentStanding(highScore, playerId) {
  await redis.zAdd('leaderboard', { score: highScore, value: playerId });
  const playerCount = await redis.zCard('leaderboard');
  const playerRank = await redis.zRevRank('leaderboard', playerId) + 1;
  return [playerRank, Math.floor(playerRank / playerCount)];
}

module.exports = router;