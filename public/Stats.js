export default class Stats {
  #highScore
  #highestTile
  #playerId
  
  constructor(playerId) {
    this.#highScore = 0;
    this.#highestTile = 0;
    this.#playerId = playerId;
    // fetchPlayerStats();
  }

  get playerId() {
    return this.#playerId;
  }

  get highScore() {
    return this.#highScore;
  }

  set highScore(score) {
    this.#highScore = score;
  }

  get highestTile() {
    return this.#highestTile;
  }

  set highestTile(value) {
    this.#highestTile = value;
  }

  async fetchPlayerStats() {
    let data = await new Promise((resolve) => {
      // db call
      setTimeout(2000);
      resolve({
        highScore: 1480348,
        highestTile: 4096
      });
    });
    this.#highScore = data.highScore;
    this.#highestTile = data.highestTile;
  }

  updatePlayerStats() {
    // save to db
  }

  fetchLeaderboard() {

  }
}