export default class Stats {
  #highScore
  #highestTile
  #highestRank
  #highestPercentile
  #playerId
  
  constructor(playerId) {
    this.#playerId = playerId;
    this.#highScore = localStorage.getItem("highScore") || 0;
    this.#highestTile = localStorage.getItem("highestTile") || 0;
    this.#highestRank = localStorage.getItem("highestRank") || 0;
    this.#highestPercentile = localStorage.getItem("highestPercentile") || 0;
    this.fetchPlayerStats();
  }

  get playerId() {
    return this.#playerId;
  }

  get highScore() {
    return this.#highScore;
  }

  set highScore(score) {
    this.#highScore = score;
    localStorage.setItem("highScore", this.#highScore);
  }

  get highestTile() {
    return this.#highestTile;
  }

  set highestTile(value) {
    this.#highestTile = value;
    localStorage.setItem("highestTile", this.#highestTile);
  }

  get highestRank() {
    return this.#highestRank;
  }

  set highestRank(value) {
    this.#highestRank = value;
    localStorage.setItem("highestRank", this.#highestRank);
  }

  get highestPercentile() {
    return this.#highestPercentile;
  }

  set highestPercentile(value) {
    this.#highestPercentile = value;
    localStorage.setItem("highestPercentile", this.#highestPercentile);
  }

  async fetchPlayerStats() {
    let data = await new Promise((resolve) => {
      // db call
      setTimeout(2000);
      resolve({
        highScore: 160,
        highestTile: 4,
        highestRank: 2,
        highestPercentile: 1
      });
    });
    this.highScore = data.highScore;
    this.highestTile = data.highestTile;
    this.highestRank = data.highestRank;
    this.highestPercentile = data.highestPercentile;
  }

  async updatePlayerStats() {
    // save to db
    setTimeout(2000);
  }

  fetchLeaderboard() {
    
  }
}