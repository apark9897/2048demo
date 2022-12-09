const baseUrl = 'http://localhost:2048';

export default class Stats {
  #highScore
  #highestTile
  #currentRank
  #currentPercentile
  #leaderboard
  #playerId
  #username
  
  constructor(playerId) {
    this.#playerId = playerId;
    this.#highScore = parseInt(localStorage.getItem("highScore")) || 0;
    this.#highestTile = parseInt(localStorage.getItem("highestTile")) || 0;
    this.#currentRank = localStorage.getItem("currentRank") || 0;
    this.#currentPercentile = localStorage.getItem("currentPercentile") || 0;
    this.#leaderboard = localStorage.getItem("leaderboard") || [];
    this.#username = localStorage.getItem("username") || 'UnknownPlayer';
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

  get currentRank() {
    return this.#currentRank;
  }

  set currentRank(value) {
    this.#currentRank = value;
    localStorage.setItem("currentRank", this.#currentRank);
  }

  get currentPercentile() {
    return this.#currentPercentile;
  }

  set currentPercentile(value) {
    this.#currentPercentile = value;
    localStorage.setItem("currentPercentile", this.#currentPercentile);
  }

  get leaderboard() {
    return this.#leaderboard;
  }

  set leaderboard(l) {
    this.#leaderboard = l;
    localStorage.setItem("leaderboard", this.#leaderboard);
  }

  get username() {
    return this.#username;
  }

  set username(value) {
    this.#username = value;
    localStorage.setItem("username", value);
  }

  async fetchPlayerStats() {
    let response = await axios(`${baseUrl}/stats/player/${this.playerId}`);
    this.highScore = response.data.highScore || this.highScore;
    this.highestTile = response.data.highestTile || this.highestTile;
    this.currentRank = response.data.currentRank || this.currentRank;
    this.currentPercentile = response.data.currentPercentile || this.currentPercentile;
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