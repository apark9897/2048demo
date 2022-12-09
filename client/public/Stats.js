const baseUrl = 'http://localhost:2048';

export default class Stats {
  #highScore
  #highestTile
  #highestRank
  #highestPercentile
  #leaderboard
  #playerId
  
  constructor(playerId) {
    this.#playerId = playerId;
    this.#highScore = localStorage.getItem("highScore") || 0;
    this.#highestTile = localStorage.getItem("highestTile") || 0;
    this.#highestRank = localStorage.getItem("highestRank") || 0;
    this.#highestPercentile = localStorage.getItem("highestPercentile") || 0;
    this.#leaderboard = localStorage.getItem("leaderboard") || [];
    this.fetchPlayerStats();
    this.fetchLeaderboard();
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

  get leaderboard() {
    return this.#leaderboard;
  }

  set leaderboard(l) {
    this.#leaderboard = l;
    localStorage.setItem("leaderboard", this.#leaderboard);
  }

  async fetchPlayerStats() {
    let response = await axios(`${baseUrl}/stats/player/${this.playerId}`);
    this.highScore = response.data.highScore;
    this.highestTile = response.data.highestTile;
    this.highestRank = response.data.highestRank;
    this.highestPercentile = response.data.highestPercentile;
  }

  async updatePlayerStats() {
    await axios.put(`${baseUrl}/stats/player/${this.playerId}`, {
      highestTile: this.highestTile,
      highScore: this.highScore,
      username: this.username
    });
  }

  async fetchLeaderboard() {
    let response = await axios(`${baseUrl}/stats/leaderboard`);
    this.leaderboard = response.data;
  }
}